import { zodResolver } from "@hookform/resolvers/zod";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { DateInput } from "@nextui-org/date-input";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import { Plus, UserRoundPlus } from "lucide-react";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { useCreateEmployee } from "./hooks/useCreateEmployee";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { SubmitButton } from "@/components/submit-button";
import { useUserStore } from "@/stores";
import { useEmployeeDetailsStore } from "@/stores/useEmployeeDetailsStore";

export const newUserSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, "First Name must be at least 1 characters"),
  lastName: z.string().min(1, "Last Name must be at least 1 characters"),
  jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
  photoURL: z.string().min(5, "Photo URL must be at least 5 characters"),
  birthdate: z.custom<DateValue>((value) => value),
  startDate: z.custom<DateValue>((value) => value),
  addresses: z.array(
    z.object({
      id: z.string(),
      type: z.union([
        z.literal("home"),
        z.literal("mailing"),
        z.literal("custom"),
      ]),
      address: z
        .string()
        .min(5, { message: "Address must be at least 5 characters" }),
    })
  ),
});

export type NewUserSchema = z.infer<typeof newUserSchema>;

export const NewEmployeePage = () => {
  const { type: userType } = useUserStore();
  const { setEmployeeDetails } = useEmployeeDetailsStore();
  const { mutate } = useCreateEmployee();
  const navigate = useNavigate();

  const formatDateValueToDate = (dateValue?: DateValue) => {
    if (!dateValue) return;

    return new Date(dateValue.year, dateValue.month - 1, dateValue.day);
  };

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<NewUserSchema>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      id: uuidv4(),
      addresses: [{ id: uuidv4(), type: "home", address: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit = (data: NewUserSchema) => {
    const newUserData = {
      ...data,
      birthdate: formatDateValueToDate(data.birthdate) as unknown as Date,
      startDate: formatDateValueToDate(data.startDate) as unknown as Date,
    };

    mutate(newUserData);
    setEmployeeDetails(newUserData);

    navigate("/employee-details");
  };

  const invalidDateMessage = "Please enter a valid date.";

  useEffect(() => {
    if (userType !== "admin") {
      navigate("/");
    }
  }, [userType]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="m-3 flex max-h-[710px] w-full max-w-lg flex-col gap-5 overflow-auto rounded-2xl bg-white p-8 shadow-md dark:bg-zinc-900">
        <Header />
        <h2 className="text-lg font-semibold">Add New Employee</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <Input
              errorMessage={errors.firstName?.message}
              label="First Name"
              register={register("firstName")}
            />
            <Input
              errorMessage={errors.lastName?.message}
              label="Last Name"
              register={register("lastName")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              errorMessage={errors.jobTitle?.message}
              label="Job Title"
              register={register("jobTitle")}
            />
            <Input
              errorMessage={errors.photoURL?.message}
              label="Photo URL"
              register={register("photoURL")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="birthdate"
              render={({ field }) => (
                <DateInput
                  {...field}
                  errorMessage={(value) => {
                    if (value.isInvalid || value.validationDetails) {
                      return invalidDateMessage;
                    }
                  }}
                  isInvalid={Boolean(errors.birthdate)}
                  label="Birthdate"
                  maxValue={today(getLocalTimeZone())}
                  size="sm"
                />
              )}
            />
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DateInput
                  {...field}
                  errorMessage={(value) => {
                    if (value.isInvalid || value.validationDetails) {
                      return invalidDateMessage;
                    }
                  }}
                  isInvalid={Boolean(errors.startDate)}
                  label="StartDate"
                  maxValue={today(getLocalTimeZone())}
                  size="sm"
                />
              )}
            />
          </div>
          <Divider />
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                defaultValue={field.type}
                name={`addresses.${index}.type`}
                render={({ field: item }) => (
                  <Select
                    {...item}
                    defaultSelectedKeys={[item.value]}
                    errorMessage={"Address Type is required"}
                    isInvalid={Boolean(errors.addresses?.[index]?.type)}
                    label="Address Type"
                    size="sm"
                  >
                    <SelectItem key="home" color="primary" value="home">
                      Home
                    </SelectItem>
                    <SelectItem key="mailing" color="success" value="mailing">
                      Mailing
                    </SelectItem>
                    <SelectItem key="custom" color="warning" value="custom">
                      Custom
                    </SelectItem>
                  </Select>
                )}
              />
              <Input
                errorMessage={errors.addresses?.[index]?.address?.message}
                label="Address"
                register={register(`addresses.${index}.address`)}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="light"
            onClick={() => append({ address: "", id: uuidv4(), type: "home" })}
          >
            <Plus size={16} />
            New Address
          </Button>
          <SubmitButton icon={<UserRoundPlus size={16} />} label="Create" />
        </form>
      </div>
      <Footer />
    </div>
  );
};
