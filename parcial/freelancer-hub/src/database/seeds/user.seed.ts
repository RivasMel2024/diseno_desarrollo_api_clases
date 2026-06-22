export type UserSeed = {
  email: string;
  name: string;
  password: string;
};

export const USER_SEED_DATA: UserSeed[] = [
  {
    email: 'melisa.rivas@hub.com',
    name: 'Estudiante de APIs',
    password: '123456',
  },
  {
    email: 'freelancer.demo@hub.com',
    name: 'Freelancer Demo',
    password: '123456',
  },
  {
    email: 'maria.design@hub.com',
    name: 'Maria Gonzalez',
    password: '123456',
  },
  {
    email: 'carlos.dev@hub.com',
    name: 'Carlos Mendoza',
    password: '123456',
  },
];
