import { Avatar } from "@nextui-org/avatar";

interface EmployeeAvatarProps {
  firstName: string;
  lastName: string;
  photoURL: string;
  jobTitle: string;
}

export const EmployeeAvatar = ({
  firstName,
  lastName,
  photoURL,
  jobTitle,
}: EmployeeAvatarProps) => (
  <div className="flex w-full items-center gap-3">
    <Avatar
      className="h-28 w-28 min-w-28 text-large"
      name={firstName}
      src={photoURL}
    />
    <div className="flex flex-col justify-center">
      <h1 className="text-3xl font-semibold">
        {firstName} {lastName}
      </h1>
      <h2 className="text-lg font-medium">{jobTitle}</h2>
    </div>
  </div>
);
