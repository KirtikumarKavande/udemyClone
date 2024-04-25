"use client";

import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor({
  onChange,
  value,
}: {
  onChange: (val: string) => void;
  value: string;
}) {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
}
export default Editor;
