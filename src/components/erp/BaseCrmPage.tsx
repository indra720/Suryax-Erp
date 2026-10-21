import { PageHeader, Card } from "./ui";
import { DataTable, type Column } from "./DataTable";

interface BaseCrmPageProps {
  title: string;
  description?: string;
  columns: Column[];
  data: any[];
}

export function BaseCrmPage({ title, description, columns, data }: BaseCrmPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description || `Manage your ${title.toLowerCase()} records.`}
      />
      <Card>
        <DataTable columns={columns} rows={data} />
      </Card>
    </div>
  );
}
