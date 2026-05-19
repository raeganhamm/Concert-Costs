type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="page-header space-y-2">
      <h1 className="page-title">{title}</h1>
      <p className="text-helper max-w-2xl">{description}</p>
    </header>
  );
}
