import React, { useEffect, useRef, useState } from "react";
import { ClassModel } from "../../../../core/model/classes";
import { Button } from "../../../_global/components/Button";
import { Drawer } from "../../../_global/components/Drawer";
import { Poppins } from "../../../_global/components/Text";
import { InputLabel } from "../../../_global/components/InputLabel";
import {
  useClassesCreation,
  useDetailClass,
} from "../../../class/hooks/useClasses";
import { validateImageAspectRatio } from "../../../_global/helper/ratio-aspect";
import { toast } from "react-toastify";
import { TextArea } from "../../../_global/components/TextArea";
import { DropdownRevamp } from "../../../_global/components/Dropdown/DropdownRevamp";
import { CourseLevelList, CourseLevelMapping } from "../../store";
import { useCategories } from "../../../categories/hooks/useCategories";
import { dataFetching } from "../../../_global/components/Dropdown/data-fetching";
import { UploadFile } from "../../../_global/components/UploadFiles";
import { Skeleton } from "../../../_global/components/Shimer";

type Clasess = Omit<ClassModel, "thumbnail"> & {
  thumbnail?: File;
};

interface DrawerParticipantsProps {
  show: boolean;
  onHide: () => void;
  data?: Clasess;
}

export const UpdateClassDrawer: React.FC<DrawerParticipantsProps> = ({
  onHide,
  show,
  data,
}) => {
  const [form, setForm] = useState<Clasess | undefined>(data);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: categories, isFetching } = useCategories();

  const [image, setImage] = useState<File | undefined>(undefined);
  const mutation = useClassesCreation();
  const [isFree, setIsFree] = useState<boolean>(false);

  const generalOnChange = (
    key: keyof Clasess,
    value: string | number | Record<string, string>
  ) => {
    if (form) {
      setForm({ ...form, [key]: value });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const isValid = await validateImageAspectRatio(selectedFile);
    if (!isValid) {
      toast.error("Please upload an image with a 16:9 aspect ratio");
      inputRef.current!.value = ""; // reset input value
      return;
    }
    setForm((prev) => ({ ...prev, thumbnail: selectedFile } as Clasess));
    setImage(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const updateData = {
      name: form?.name,
      description: form?.description,
      level: form?.level,
      categoryId: form?.category.id,
      price: form?.price,
      thumbnail: image,
    };
    if (form) {
      Object.entries(updateData).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value as string);
        }
      });

      await mutation.mutateAsync({
        type: "update",
        data: formData,
        id: form.id,
      });
      setForm(undefined)
      setImage(undefined)
      setIsFree(false)
      onHide();
    }
  };

  const { data: detail, isFetching: classFetching } = useDetailClass(
    "id",
    show ? form?.id : undefined
  );

  const getImagePreview = () => {
    if (image) {
      return URL.createObjectURL(image); // untuk preview file baru
    }
    if (form?.thumbnail) {
      return form.thumbnail as unknown as string; // fallback
    }
    return undefined;
  };

  useEffect(() => {
    if (show && data) {
      setForm(data);
      data.price ? setIsFree(false) : setIsFree(true);
    }
  }, [show, data]);

  return (
    <>
      <Drawer
        show={show}
        onHide={onHide}
        close={{ title: "Close" }}
        style={{
          marginTop: "3rem",
        }}
      >
        <Poppins className="text-left text-lg px-5 mb-5 font-semibold">
          Update Class
        </Poppins>
        {classFetching ? (
          <>
            <div className="flex flex-col gap-4 px-4">
              {Array.from({ length: 3 }).map(() => (
                <Skeleton width="100%" height="4rem" />
              ))}
            </div>
          </>
        ) : (
          <form
            className="px-5 flex flex-col items-center gap-3"
              onSubmit={handleSubmit}
          >
            <InputLabel
              title="Class Name"
              titleSize="sm"
              inputProps={{
                onChange: (e) => generalOnChange("name", e.target.value),
                value: form?.name,
              }}
            />
            <div className="w-full flex flex-col gap-2">
              <Poppins className="text-sm">Description</Poppins>
              <TextArea
                style={{
                  resize: "none",
                  height: "10rem",
                }}
                defaultValue={form?.description}
                onChange={(e) => generalOnChange("description", e.target.value)}
              ></TextArea>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Poppins className="text-sm">Level</Poppins>
              <DropdownRevamp
                list={CourseLevelList}
                defaultValue={
                  form
                    ? {
                        label: CourseLevelMapping[form?.level],
                        value: form?.level,
                      }
                    : undefined
                }
                onChange={(e) => generalOnChange("level", e.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Poppins className="text-sm">Category</Poppins>
              <DropdownRevamp
                searchInput
                disabled={isFetching}
                defaultValue={
                  form
                    ? {
                        label: form?.category?.name,
                        value: form?.category?.id,
                      }
                    : undefined
                }
                list={dataFetching(
                  isFetching,
                  (categories?.data || [])?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                )}
                onChange={(e) =>
                  generalOnChange("category", { id: e.value, name: e.label })
                }
              />
            </div>

            <div className="w-full flex flex-col gap-2">
            {getImagePreview() ? <img src={getImagePreview()} className="rounded-lg" width={'100%'} height={'5rem'} /> : null}
              <UploadFile
              title="Thumbnail"
                extensions={[".jpg", ".jpeg", ".png"]}
                onChange={handleFileChange}
                file={image}
                defaultFile={
                  !image && form?.thumbnail
                    ? {
                        name:
                          (form?.thumbnail as unknown as string)
                            ?.split("/")
                            .pop() || "",
                        size: detail?.data?.thumbnailFileSize ?? 0,
                      }
                    : undefined
                }
              />
              {image || form?.thumbnail ? (
                <div className="-mt-4 mb-8">
                  <Button
                    variant="danger"
                    onClick={() => {
                      setForm(
                        (prev) => ({ ...prev, thumbnail: undefined } as Clasess)
                      );
                      setImage(undefined);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              ) : null}
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
                    setForm(
                      (prev) =>
                        ({ ...prev, price: Number(e.target.value) } as Clasess)
                    );
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

            <Button
              type="submit"
              variant={mutation.isPending ? "disabled" : "primary"}
            >
              {mutation.isPending ? "Loading..." : "Update Class"}
            </Button>
          </form>
        )}
      </Drawer>
    </>
  );
};
