import React from "react";

type Props = {
  filesCount: number;
  onMerge: () => void;
  busy: boolean;
  onClear: () => void;
  disabled?: boolean;
};

export default function SidebarMerge({ filesCount, onMerge, busy, onClear, disabled }: Props) {
  return (
    <div className="h-[calc(100vh-96px)] flex flex-col border-l pl-6 pr-4">
      <div className="py-6">
        <h3 className="text-2xl font-semibold mb-4">Merge PDF</h3>

        <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm">
          To change the order of your PDFs, drag and drop the files as you want.
        </div>

        <div className="mt-6 text-sm text-gray-600">
          {filesCount === 0 ? "No files added." : `${filesCount} file${filesCount > 1 ? "s" : ""} added.`}
        </div>
      </div>

      <div className="mt-auto pb-6">
        <div className="flex gap-3">
          <button
            onClick={onMerge}
            disabled={disabled}
            className="flex-1 px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy ? "Merging..." : "Merge PDF"}
          </button>
        </div>


      </div>
    </div>
  );
}
