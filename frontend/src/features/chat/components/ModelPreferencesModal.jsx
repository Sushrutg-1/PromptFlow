import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components";
import { PROVIDERS } from "@/constants/provider.constant";
import { setSelectedModels } from "../chat.slice";

export default function ModelPreferencesModal({ open, onClose }) {
  const dispatch = useDispatch();

  const [providers, setProviders] = useState(
    PROVIDERS.map((provider) => ({
      ...provider,
      selectedModel: provider.models.find((m) => m.enabled)?.id || provider.models[0].id,
      active: provider.enabled,
    }))
  );

  const hasSelectedModel = providers.some((provider) => provider.active);
  if (!open) return null;

  const handleToggle = (id) => {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.id === id ? { ...provider, active: !provider.active } : provider
      )
    );
  };

  const handleModelChange = (id, model) => {
    setProviders((prev) =>
      prev.map((provider) =>
        provider.id === id ? { ...provider, selectedModel: model } : provider
      )
    );
  };

  const handleApply = () => {
    const selected = providers
      .filter((provider) => provider.active)
      .map((provider) => ({
        provider: provider.id,
        model: provider.selectedModel,
      }));

    if (selected.length === 0) {
      alert("Please select at least one model.");
      return;
    }

    dispatch(setSelectedModels(selected));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div className="w-187.5 rounded-2xl bg-zinc-900 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Choose Your AI Models</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-3">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`flex items-center justify-between rounded-xl border border-zinc-800 p-4 ${
                !provider.enabled && "opacity-40"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* <img
                  src={provider.logo}
                  alt={provider.name}
                  className="h-8 w-8"
                /> */}

                <h3 className="font-medium">{provider.name}</h3>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={provider.selectedModel}
                  disabled={!provider.enabled}
                  onChange={(e) => handleModelChange(provider.id, e.target.value)}
                  className="rounded-lg bg-zinc-800 px-3 py-2"
                >
                  {provider.models.map((model) => (
                    <option key={model.id} value={model.id} disabled={!model.enabled}>
                      {model.name}
                    </option>
                  ))}
                </select>

                <input
                  type="checkbox"
                  checked={provider.active}
                  disabled={!provider.enabled}
                  onChange={() => handleToggle(provider.id)}
                  className="h-5 w-5 accent-violet-600"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            className="disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasSelectedModel}
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
