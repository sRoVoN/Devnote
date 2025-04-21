// app/notes/[id]/edit/page
import EditClient from "@/app/components/editClient";

interface Props {
  params: { id: string };
}

export default async function EditPage( {params}: Props) {
  const { id } = await params;

  return <EditClient id={id} />;
}