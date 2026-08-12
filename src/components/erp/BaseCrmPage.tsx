import { CrudPage } from "./CrudPage";

interface BaseCrmPageProps {
  title: string;
  description?: string;
  columns: any[];
  data: any[];
}

export function BaseCrmPage({ title, description, columns, data }: BaseCrmPageProps) {
  return (
    <CrudPage
      title={title}
      description={description || `Manage your ${title.toLowerCase()} records.`}
      columns={columns}
      data={data}
    />
  );
}
