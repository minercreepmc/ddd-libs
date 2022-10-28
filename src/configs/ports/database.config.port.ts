export const DATABASE_CONFIG_SERVICE = Symbol('DATABASE_CONFIG_SERVICE');
export interface DatabaseConfigPort {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}
