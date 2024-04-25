"use client";

import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Preview({ value }: { value: string }) {
  return <ReactQuill theme="snow" value={value} readOnly />;
}
export default Preview;
