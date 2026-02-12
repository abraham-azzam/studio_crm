'use client';

import { useEffect, useState } from 'react';

type ThemeState = Record<string, string | number | boolean>;

const fields: Array<{ key: string; label: string; type: string }> = [
  { key: 'primaryColor', label: 'Primary Color', type: 'color' },
  { key: 'secondaryColor', label: 'Secondary Color', type: 'color' },
  { key: 'accentColor', label: 'Accent Color', type: 'color' },
  { key: 'backgroundLight', label: 'Background Light', type: 'color' },
  { key: 'backgroundDark', label: 'Background Dark', type: 'color' },
  { key: 'textLight', label: 'Text Light', type: 'color' },
  { key: 'textDark', label: 'Text Dark', type: 'color' },
  { key: 'logoLight', label: 'Logo Light', type: 'text' },
  { key: 'logoDark', label: 'Logo Dark', type: 'text' },
  { key: 'favicon', label: 'Favicon', type: 'text' },
  { key: 'logoSize', label: 'Logo Size', type: 'number' },
  { key: 'fontFamily', label: 'Font Family', type: 'text' },
  { key: 'baseFontSize', label: 'Base Font Size', type: 'number' },
  { key: 'headingScale', label: 'Heading Scale', type: 'number' },
  { key: 'buttonRadius', label: 'Button Radius', type: 'number' },
  { key: 'sectionSpacing', label: 'Section Spacing', type: 'number' },
  { key: 'containerWidth', label: 'Container Width', type: 'number' },
  { key: 'shadowIntensity', label: 'Shadow Intensity', type: 'number' },
  { key: 'animationSpeed', label: 'Animation Speed', type: 'number' }
];

export function ThemeEditor({ initial }: { initial: ThemeState }) {
  const [state, setState] = useState<ThemeState>(initial);

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--primary', String(state.primaryColor));
    root.setProperty('--secondary', String(state.secondaryColor));
    root.setProperty('--accent', String(state.accentColor));
    root.setProperty('--background-light', String(state.backgroundLight));
    root.setProperty('--background-dark', String(state.backgroundDark));
    root.setProperty('--foreground-light', String(state.textLight));
    root.setProperty('--foreground-dark', String(state.textDark));
    root.setProperty('--radius', `${state.buttonRadius}px`);
    root.setProperty('--section-spacing', `${state.sectionSpacing}px`);
    root.setProperty('--container-width', `${state.containerWidth}px`);
    root.setProperty('--shadow-intensity', `${state.shadowIntensity}`);
    root.setProperty('--font-size', `${state.baseFontSize}px`);
    root.setProperty('--heading-scale', `${state.headingScale}`);
    root.setProperty('--motion-speed', `${state.animationSpeed}`);
  }, [state]);

  const save = async () => {
    await fetch('/api/admin/theme', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    });
    alert('Theme saved');
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Theme Settings</h1>
      <div className="grid gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-6 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="text-sm">
            <span className="mb-2 block text-slate-300">{field.label}</span>
            <input
              type={field.type}
              value={String(state[field.key] ?? '')}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value
                }))
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
            />
          </label>
        ))}

        <label className="text-sm text-slate-300">
          <input
            type="checkbox"
            checked={Boolean(state.darkModeEnabled)}
            onChange={(e) => setState((prev) => ({ ...prev, darkModeEnabled: e.target.checked }))}
            className="mr-2"
          />
          Enable Dark Mode
        </label>
      </div>
      <button onClick={save} className="mt-5 rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white">
        Save Theme
      </button>
    </div>
  );
}
