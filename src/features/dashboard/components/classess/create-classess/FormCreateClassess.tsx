import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { DropdownRevamp } from "../../../../_global/components/Dropdown/DropdownRevamp";
import { InputLabel } from "../../../../_global/components/InputLabel";
import { Poppins } from "../../../../_global/components/Text";
import { TextArea } from "../../../../_global/components/TextArea";
import { validateImageAspectRatio } from "../../../../_global/helper/ratio-aspect";
import { CourseLevelList } from "../../../store";
import { ClassLevel } from "../../../../../core/model/classes";
import { Button } from "../../../../_global/components/Button";
import { useCategories } from "../../../../categories/hooks/useCategories";
import { dataFetching } from "../../../../_global/components/Dropdown/data-fetching";
import { useClassesCreation } from "../../../../class/hooks/useClasses";
import { UploadFile } from "../../../../_global/components/UploadFiles";

interface ICourseForm {
  name: string;
  description?: string;
  level?: ClassLevel;
  price: number;
  categoryId: string;
  thumbnail?: File;
}

export const FormCreateClassess = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFree, setIsFree] = useState<boolean>(false);
  const [form, setForm] = useState<ICourseForm>({
    name: "",
    price: 0,
    description: undefined,
    level: undefined,
    categoryId: "",
  });

  const mutation = useClassesCreation();

  const { data: categories, isFetching } = useCategories();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const isValid = await validateImageAspectRatio(selectedFile);
    if (!isValid) {
      toast.error("Please upload an image with a 16:9 aspect ratio");
      inputRef.current!.value = ""; // reset input value
      return;
    }
    setForm((prev) => ({ ...prev, thumbnail: selectedFile })); // simpan file kalau valid
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    await mutation.mutateAsync({
      type: "create",
      data: formData,
    });
  };

  const getImagePreview = () => {
    if (form.thumbnail) {
      return URL.createObjectURL(form.thumbnail); // untuk preview file baru
    }
    return undefined;
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="w-full">
          <InputLabel
            titleSize="sm"
            title="Course Name"
            inputProps={{
              inputSize: "md",
              onChange: (e) =>
                setForm((prev) => ({ ...prev, name: e.target.value })),
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Poppins className="text-sm">Description</Poppins>
          <TextArea
            style={{
              resize: "none",
              height: "10rem",
            }}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
          ></TextArea>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Poppins className="text-sm">Level</Poppins>
          <DropdownRevamp
            withShadow
            list={CourseLevelList}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, level: e.value as ClassLevel }))
            }
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Poppins className="text-sm">Category</Poppins>
          <DropdownRevamp
            withShadow
            searchInput
            disabled={isFetching}
            list={dataFetching(
              isFetching,
              (categories?.data || [])?.map((item) => ({
                label: item.name,
                value: item.id,
              }))
            )}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, categoryId: e.value }))
            }
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          {form.thumbnail ? (
            <img
              src={getImagePreview()}
              className="rounded-lg"
              width="50%"
              height={"5rem"}
            />
          ) : null}
          <UploadFile
            file={form.thumbnail}
            title="Thumbnail"
            extensions={[".jpg", ".jpeg", ".png", ".webp"]}
            onChange={handleFileChange}
          />
        </div>

        <div className="w-full flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFree || false}
            onChange={() => setIsFree((prev) => !prev)}
            className="checkbox rounded-md w-[1.25rem] h-[1.25rem]"
          />
          <Poppins className="text-sm">Free</Poppins>
        </div>

        <div className="w-full flex flex-col gap-2">
          <InputLabel
            titleSize="sm"
            title="Price"
            inputProps={{
              inputSize: "md",
              disabled: isFree,
              inputStyle: "addons",
              currency: true,
              onChange: (e) => {
                setForm((prev) => ({ ...prev, price: Number(e.target.value) }));
              },
              LeftIcon: (
                <>
                  <div className="h-full w-[3rem] bg-gray-500 flex items-center justify-center">
                    <Poppins className="text-white text-sm">Rp</Poppins>
                  </div>
                </>
              ),
            }}
          />
        </div>
        <Button size="lg" variant={mutation.isPending ? "disabled" : "primary"}>
          {mutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};
