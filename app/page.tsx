import { InputField } from "./_components/input-field";
import { TriedPasswordField } from "./_components/tried-password-field";

const HomePage = () => {
  return (
    <div className="h-full w-full flex flex-col p-4">
      <InputField />
      <TriedPasswordField />
    </div>
  );
};

export default HomePage;