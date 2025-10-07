import { redirect } from "next/navigation";
import { routes } from "./routes";


export default function Home() {
   redirect(routes.dashboard.home)
}
