import { MdHourglassEmpty } from "react-icons/md";
import { Poppins } from "../Text";
import { TbMoodEmpty } from "react-icons/tb";

interface IEmptyProps {
  description?: string[];
  colspan?: number;
  customMinHeight?: number | string;
}

export const EmptyState: React.FC<IEmptyProps> = ({
  description,
  colspan,
  customMinHeight = "300px",
}) => {
  return (
    <>
      {colspan ? (
        <td colSpan={colspan}>
          <div
            className={`flex items-center flex-col justify-center w-full h-full p-5 gap-5`}
            style={{
              minHeight: customMinHeight,
            }}
          >
            <TbMoodEmpty className="text-8xl" />
            {description && (
              <div className="flex flex-col items-center justify-center">
                {description.map((item) => (
                  <Poppins className="text-md font-medium">{item}</Poppins>
                ))}
              </div>
            )}
          </div>
        </td>
      ) : (
        <div
          className={`flex items-center justify-center w-full h-full p-5 gap-5`}
          style={{
            minHeight: customMinHeight,
          }}
        >
          <MdHourglassEmpty className="text-5xl" />
          {description && (
            <div className="flex justify-center">
              {description.map((item) => (
                <Poppins className="text-md font-medium">{item}</Poppins>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
