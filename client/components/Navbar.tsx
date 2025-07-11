// components/Navbar.tsx
import { Button, Text } from "@mantine/core";

export default function Navbar({ onCreateJobClick }: { onCreateJobClick: () => void }) {
  return (
    <div className="w-[890px] h-[80px] mx-auto mt-[21px] rounded-[122px] border border-gray-200 shadow-sm bg-white px-[26px] flex items-center">
      <div className="w-[838px] h-[48px] flex items-center justify-between">
        <img
          src="https://ik.imagekit.io/nknso76xld/Cybermind%20Works/cybermind_works_logo.jpg?updatedAt=1752155603648"
          alt="Cybermind Works Logo"
          className="h-[48px] w-auto object-contain"
        />

        <div className="flex gap-[40px]">
          <Text className="cursor-pointer text-base">Home</Text>
          <Text className="cursor-pointer text-base">Find Jobs</Text>
          <Text className="cursor-pointer text-base">Find Talents</Text>
          <Text className="cursor-pointer text-base">About Us</Text>
          <Text className="cursor-pointer text-base">Testimonials</Text>
        </div>

        <Button
          className="w-[133px] h-[48px] rounded-[12px] px-[5px] bg-[#9420EE] text-white font-medium hover:bg-[#7b1dc5] transition"
          onClick={onCreateJobClick}
        >
          Create Jobs
        </Button>
      </div>
    </div>
  );
}
