import type {Config} from 'drizzle-kit'
import * as dotenv from 'dotenv'
dotenv.config({path: '.env.local'})





export default {
  schema: './lib/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL!
  }
} satisfies Config

// export default defineConfig({
//  schema: "./lib/db/index.ts",
//   driver: 'pg',
//   dbCredentials: {
//     connectionString: process.env.DB_URL!,
//   },
//   verbose: true,
//   strict: true,
// })