import EditClient from "@/app/components/editClient"; // regular import

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params
  const resolvedParams = await params;
  
  // Pass the resolved id to the client-side component
  return <EditClient id={resolvedParams.id} />;
}
