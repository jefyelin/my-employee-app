import { zodResolver } from "@hookform/resolvers/zod";
import {
  DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Select, SelectItem } from "@nextui-org/select";
import { format } from "date-fns";
import { FileText, Plus } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { DateInput } from "@/components/date-input";
import { Input } from "@/components/input";
import { SubmitButton } from "@/components/submit-button";
import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

export const editDetailsSchema = z.object({
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

export type EditDetailsSchema = z.infer<typeof editDetailsSchema>;

interface EmployeeFormProps {
  initialValues: EmployeeDetails;
  onSubmit: (data: EditDetailsSchema) => void;
}

export const EmployeeForm = ({
  initialValues,
  onSubmit,
}: EmployeeFormProps) => {
  const formatDateToDateValue = (date?: Date) => {
    if (!date) return;

    const newDate = format(date, "yyyy-MM-dd");

    return parseDate(newDate);
  };

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EditDetailsSchema>({
    resolver: zodResolver(editDetailsSchema),
    defaultValues: {
      id: initialValues.id,
      firstName: initialValues.firstName,
      lastName: initialValues.lastName,
      jobTitle: initialValues.jobTitle,
      photoURL: initialValues.photoURL,
      birthdate: formatDateToDateValue(initialValues?.birthdate),
      startDate: formatDateToDateValue(initialValues?.startDate),
      addresses: initialValues?.addresses,
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "addresses",
  });

  return (
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
        <DateInput
          control={control}
          label="Birthdate"
          maxValue={today(getLocalTimeZone())}
          name="birthdate"
        />
        <DateInput
          control={control}
          label="StartDate"
          maxValue={today(getLocalTimeZone())}
          name="startDate"
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
      <SubmitButton icon={<FileText size={16} />} label="Update" />
    </form>
  );
};
