import { useEffect, useRef, useState } from "react";
import { HiDocumentSearch, HiDotsVertical } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";
import { ConditionNode } from "../../../_global/components/ConditionNode";
import { Poppins } from "../../../_global/components/Text";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa6";
import { useProfile } from "../../../profile/useProfile";

interface OptionClassProps {
  code?: string;
}

export const OptionClass: React.FC<OptionClassProps> = ({ code }) => {
  const { data: profile } = useProfile();
  const [show, setShow] = useState<boolean>(false);
  const [successCopy, setSuccessCopy] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detect click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false);
        setSuccessCopy(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/invitation/${code}`)
      .then(() => {
        toast.success("Copied to clipboard");
        setSuccessCopy(true);
      });
  };

  const toggle = () => {
    setShow((prev) => !prev);
    setSuccessCopy(false);
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-300 cursor-pointer"
        onClick={toggle}
      >
        <HiDotsVertical size={12} />
      </div>
      <ConditionNode condition={show}>
        <div className="absolute w-[10rem] bg-[#fffeff] shadow-[0_0_15px_rgba(0,0,0,0.2)] h-max py-2 px-2 rounded-md z-[9999]">
          <ConditionNode condition={!!profile?.data?.isMentor}>
            <div
              className="flex items-center gap-2 hover:bg-gray-100 py-2 px-3 rounded-md cursor-pointer"
              onClick={handleCopy}
            >
              <ConditionNode
                condition={successCopy}
                option={<MdContentCopy size={14} />}
              >
                <FaCheck className="text-green-500" />
              </ConditionNode>
              <Poppins
                className={`text-sm ${successCopy ? "text-green-400" : ""}`}
              >
                Copy Link
              </Poppins>
            </div>
          </ConditionNode>
          <div
            className="flex items-center gap-2 hover:bg-gray-100 py-2 px-3 rounded-md cursor-pointer"
            onClick={handleCopy}
          >
            <HiDocumentSearch size={14} />
            <Poppins
              className={`text-sm ${successCopy ? "text-green-400" : ""}`}
            >
              Detail Class
            </Poppins>
          </div>
        </div>
      </ConditionNode>
    </div>
  );
};
