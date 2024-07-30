import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound} from "next/navigation";

export default async function Page({params}: {params: { uuid: string} }) {
  const uuid = params.uuid;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(uuid),
    fetchCustomers(),
  ]);
  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${uuid}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
