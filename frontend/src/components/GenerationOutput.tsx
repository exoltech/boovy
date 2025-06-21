'use client';

interface GenerationOutputProps {
  result: any;
  theme: string;
}

export default function GenerationOutput({ result, theme }: GenerationOutputProps) {
  const downloadCode = async () => {
    try {
      // This would be implemented to download the generated code as ZIP
      console.log('Download functionality would be implemented here');
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b border-primary/20 px-4 py-2 bg-background/50">
        <h3 className="text-sm font-medium text-primary">Generation Result</h3>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* App Info */}
        <div>
          <h4 className="text-sm font-medium text-primary mb-2">App Configuration</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Framework:</span>
              <span className="ml-2 text-primary">{result.framework}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Backend:</span>
              <span className="ml-2 text-primary">{result.backend}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Template:</span>
              <span className="ml-2 text-primary">{result.template}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Database:</span>
              <span className="ml-2 text-primary">{result.database || 'none'}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        {result.features && result.features.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-primary mb-2">Features</h4>
            <div className="flex flex-wrap gap-1">
              {result.features.map((feature: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Integrations */}
        {result.integrations && Object.keys(result.integrations).length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-primary mb-2">Integrations</h4>
            <div className="space-y-1 text-xs">
              {Object.entries(result.integrations).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className={`${value ? 'text-green-400' : 'text-red-400'}`}>
                    {value ? '✓ Enabled' : '✗ Disabled'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {result.description && (
          <div>
            <h4 className="text-sm font-medium text-primary mb-2">Description</h4>
            <p className="text-xs text-muted-foreground">{result.description}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2 border-t border-primary/20">
          <button
            onClick={downloadCode}
            className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-md hover:bg-primary/80 transition-colors"
          >
            Download ZIP
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}
            className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-md hover:bg-secondary/80 transition-colors"
          >
            Copy JSON
          </button>
        </div>

        {/* Metadata */}
        {result.metadata && (
          <div className="text-xs text-muted-foreground pt-2 border-t border-primary/20">
            <div>Generated: {new Date(result.metadata.generatedAt).toLocaleString()}</div>
            <div>Model: {result.metadata.model}</div>
          </div>
        )}
      </div>
    </div>
  );
}

