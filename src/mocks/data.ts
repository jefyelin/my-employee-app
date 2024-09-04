import { faker } from "@faker-js/faker";

import employee1 from "@/assets/employee-1.png";
import employee10 from "@/assets/employee-10.png";
import employee11 from "@/assets/employee-11.png";
import employee12 from "@/assets/employee-12.png";
import employee13 from "@/assets/employee-13.png";
import employee14 from "@/assets/employee-14.png";
import employee15 from "@/assets/employee-15.png";
import employee16 from "@/assets/employee-16.png";
import employee17 from "@/assets/employee-17.png";
import employee18 from "@/assets/employee-18.png";
import employee19 from "@/assets/employee-19.png";
import employee2 from "@/assets/employee-2.png";
import employee20 from "@/assets/employee-20.png";
import employee3 from "@/assets/employee-3.png";
import employee4 from "@/assets/employee-4.png";
import employee5 from "@/assets/employee-5.png";
import employee6 from "@/assets/employee-6.png";
import employee7 from "@/assets/employee-7.png";
import employee8 from "@/assets/employee-8.png";
import employee9 from "@/assets/employee-9.png";
import { EmployeeDetails } from "@/stores/useEmployeeDetailsStore";

const employeePhotos = [
  employee1,
  employee2,
  employee3,
  employee4,
  employee5,
  employee6,
  employee7,
  employee8,
  employee9,
  employee10,
  employee11,
  employee12,
  employee13,
  employee14,
  employee15,
  employee16,
  employee17,
  employee18,
  employee19,
  employee20,
];

export let employees: EmployeeDetails[] = [];

const isFemaleEmployee = (i: number) => {
  const femaleEmployeeNumbers = [1, 2, 3, 6, 8, 12, 13, 14, 15, 16];

  return femaleEmployeeNumbers.includes(i + 1);
};

for (let i = 0; i < 20; i++) {
  const employee: EmployeeDetails = {
    id: faker.string.uuid(),
    firstName: isFemaleEmployee(i)
      ? faker.person.firstName("female")
      : faker.person.firstName("male"),
    lastName: isFemaleEmployee(i)
      ? faker.person.lastName("female")
      : faker.person.lastName("male"),
    jobTitle: faker.person.jobTitle(),
    birthdate: faker.date.birthdate({ min: 18, max: 45, mode: "age" }),
    startDate: faker.date.past({ years: 5 }),
    photoURL: employeePhotos[i],
    addresses: [
      {
        id: faker.string.uuid(),
        address: `${faker.location.county()} ${faker.location.secondaryAddress()}`,
        type: "home",
      },
      {
        id: faker.string.uuid(),
        address: `${faker.location.county()} ${faker.location.secondaryAddress()}`,
        type: "mailing",
      },
      {
        id: faker.string.uuid(),
        address: `${faker.location.county()} ${faker.location.secondaryAddress()}`,
        type: "custom",
      },
    ],
  };

  employees.push(employee);
}
