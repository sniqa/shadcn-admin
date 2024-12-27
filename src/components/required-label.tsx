const RequiredLabel = ({ label }: { label: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-red-700">*</span>
      {label}
    </div>
  );
};

export default RequiredLabel;
