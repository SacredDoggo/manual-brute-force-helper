"use client";

import { useState } from "react";

import { InputField } from "./_components/input-field";
import { TriedPasswordField } from "./_components/tried-password-field";

const HomePage = () => {
  const [passwords, setPasswords] = useState<TriedPassword[]>([]);

  return (
    <div className="h-full w-full flex flex-col p-4">
      <InputField passwords={passwords} setPasswords={setPasswords} />
      <TriedPasswordField passwords={passwords} setPasswords={setPasswords} />
    </div>
  );
};

export default HomePage;