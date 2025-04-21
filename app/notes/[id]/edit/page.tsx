import EditClient from "@/app/components/editClient";

export default async function EditPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <EditClient id={id} />;
}