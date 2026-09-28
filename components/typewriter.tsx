"use client";

import { useEffect, useState } from "react";

/** Cycles through `words`, typing and deleting each one. */
export default function Typewriter({ words }: { words: readonly string[] }) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const delay = done ? 1600 : empty ? 250 : deleting ? 35 : 70;

    const id = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words]);

  return (
    <span className="text-up">
      {text}
      <span className="ml-0.5 inline-block w-[0.55em] animate-blink bg-up/80">&nbsp;</span>
    </span>
  );
}
