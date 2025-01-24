import { AuthSection } from "./AuthSection";
import { Brand } from "./Brand";
import { Group } from "./Group";

export const Navbar = () => {
  return (
    <>
      <div className="w-full h-16 flex flex-row items-center pl-48 pr-24 fixed gap-28 justify-center">
        <div className="flex flex-row items-center gap-12">
          <Brand />
          <Group />
        </div>
        <AuthSection />
      </div>
    </>
  );
};
