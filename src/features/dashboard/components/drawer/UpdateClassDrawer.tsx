import React, { useEffect, useState } from "react";
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
import {
  UPLOAD_MAX_SIZE,
  validateUploadFile,
} from "../../../_global/helper/validate-file";
import { toast } from "react-toastify";
import { TextArea } from "../../../_global/components/TextArea";
import { DropdownRevamp } from "../../../_global/components/Dropdown/DropdownRevamp";
import { CourseLevelList, CourseLevelMapping } from "../../store";
import { useCategories } from "../../../categories/hooks/useCategories";
import { dataFetching } from "../../../_global/components/Dropdown/data-fetching";
import { UploadFile } from "../../../_global/components/UploadFiles";
import { Skeleton } from "../../../_global/components/Shimer";
import { CompletedClassNotice } from "../classes/ClassContentNotices";

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
    const input = e.target;
    const selectedFile = input.files?.[0];
    if (!selectedFile) return;

    const error = validateUploadFile(selectedFile, {
      maxSizeBytes: UPLOAD_MAX_SIZE.thumbnail,
      allowedExtensions: [".jpg", ".jpeg", ".png"],
    });
    if (error) {
      toast.error(error);
      input.value = "";
      return;
    }

    let isValid: boolean;
    try {
      isValid = await validateImageAspectRatio(selectedFile);
    } catch {
      toast.error("Failed to load image. Please upload a valid image file.");
      input.value = "";
      return;
    }
    if (!isValid) {
      toast.error("Please upload an image with a 16:9 aspect ratio");
      input.value = "";
      return;
    }
    setForm((prev) => ({ ...prev, thumbnail: selectedFile } as Clasess));
    setImage(selectedFile);
  };

  // The detail fetch only refines two things: the authoritative
  // completedAt (the row data already carries it — see the ?? below)
  // and the thumbnail file size shown in the upload box. Neither
  // blocks the form, so the drawer no longer waits on this fetch:
  // the form renders from the row data the moment it opens.
  const { data: detail } = useDetailClass(
    "id",
    show ? form?.id : undefined
  );
  // Detail is authoritative; the row data covers the fetch gap.
  const isCompleted = !!(
    detail?.data?.completedAt ?? form?.completedAt
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCompleted) return;
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
      try {
        await mutation.mutateAsync({
          type: "update",
          data: formData,
          id: form.id,
        });
        setForm(undefined);
        setImage(undefined);
        setIsFree(false);
        onHide();
      } catch {
        // The mutation's onError toast already reports the failure;
        // leave the drawer open so the user can retry.
      }
    }
  };

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
        {/* The form renders from the row data as soon as it exists
            (the drawer only opens with data — show={!!data} at the
            call site). The skeleton below only covers the one-frame
            gap before the effect fills `form`, so it mirrors the
            form field by field: label (text-sm, 20px) + control,
            same px-5 / gap-3 wrapper as the form itself. Measured
            from the JSX below: input md 40px, textarea 160px,
            dropdown trigger 42px, upload block ~280px, checkbox
            20px, submit 32px. */}
        {!form ? (
          <div className="px-5 flex flex-col items-center gap-3">
            <div className="w-full flex flex-col gap-2">
              <Skeleton width="6rem" height="1.25rem" />
              <Skeleton width="100%" height="2.5rem" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton width="7rem" height="1.25rem" />
              <Skeleton width="100%" height="10rem" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton width="4rem" height="1.25rem" />
              <Skeleton width="100%" height="42px" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton width="5rem" height="1.25rem" />
              <Skeleton width="100%" height="42px" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton width="100%" height="5rem" />
              <Skeleton width="6rem" height="1.5rem" />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="flex flex-col items-center gap-3">
                  <Skeleton width="3rem" height="3rem" />
                  <Skeleton width="10rem" height="1.25rem" />
                  <Skeleton width="8rem" height="1rem" />
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-2">
              <Skeleton width="1.25rem" height="1.25rem" />
              <Skeleton width="3rem" height="1.25rem" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton width="4rem" height="1.25rem" />
              <Skeleton width="100%" height="2.5rem" />
            </div>
            <Skeleton width="100%" height="2rem" />
          </div>
        ) : (
          <form
            className="px-5 flex flex-col items-center gap-3"
            onSubmit={handleSubmit}
          >
            {isCompleted && <CompletedClassNotice />}
            <InputLabel
              title="Class Name"
              titleSize="sm"
              inputProps={{
                onChange: (e) => generalOnChange("name", e.target.value),
                value: form?.name,
                disabled: isCompleted,
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
                disabled={isCompleted}
              ></TextArea>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Poppins className="text-sm">Level</Poppins>
              <DropdownRevamp
                list={CourseLevelList}
                disabled={isCompleted}
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
                disabled={isFetching || isCompleted}
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
              {getImagePreview() ? (
                <img
                  src={getImagePreview()}
                  className="rounded-lg"
                  width={"100%"}
                  height={"5rem"}
                />
              ) : null}
              {/* UploadFile has no disabled prop: block pointer input
                  instead of leaving a working picker in a locked form. */}
              <div className={isCompleted ? "pointer-events-none opacity-60" : undefined}>
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
              </div>
              {image || form?.thumbnail ? (
                <div className="-mt-4 mb-8">
                  <Button
                    variant={isCompleted ? "disabled" : "danger"}
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
                disabled={isCompleted}
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
                  disabled: isFree || isCompleted,
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
              variant={mutation.isPending || isCompleted ? "disabled" : "primary"}
            >
              {mutation.isPending ? "Loading..." : "Update Class"}
            </Button>
          </form>
        )}
      </Drawer>
    </>
  );
};
