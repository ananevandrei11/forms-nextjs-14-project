import DealForm from "@/components/DealForm";
import DealFormRHF from "@/components/DealFormRHF";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DealForm />
      <DealFormRHF />
    </main>
  );
}
