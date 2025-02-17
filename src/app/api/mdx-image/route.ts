import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const relativePath = searchParams.get("path");

  if (!relativePath) {
    return NextResponse.json({ 
      error: "Missing path parameter"
    }, { 
      status: 400 
    });
  }

  const decodedPath = decodeURIComponent(relativePath);

  const mdxDir = path.join(process.cwd(), process.env.CONTENTS_DIRECTORY || "");
  const filePath = path.join(mdxDir, decodedPath);

  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ 
      error: `File not fonud: ${filePath}`
    }, { 
      status: 404 
    });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const contentType = "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: { "Content-Type": contentType },
    });
  } catch (error) {
    return NextResponse.json({ 
      error: `Server Error: ${error}`
    }, { 
      status: 500 
    });
  }
}