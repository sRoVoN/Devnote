import EditClient from "@/app/components/editClient"; // <-- regular import!

export default function EditPage({ params }: { params: { id: string } }) {
  return <EditClient id={params.id} />;
}
