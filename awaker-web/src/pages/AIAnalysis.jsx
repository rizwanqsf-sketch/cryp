import React, { useState } from 'react';
import { Brain, UploadCloud, CheckCircle2, AlertTriangle, TrendingDown } from 'lucide-react';

function AIAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    setAnalyzing(true);
    setResult(null);
    
    try {
      // Create a dummy form data to send
      const formData = new FormData();
      formData.append('chart', new Blob(['fake image'], { type: 'image/png' }));
      
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setResult({
        direction: data.direction,
        confidence: data.confidence,
        insight: data.insight,
      });
    } catch (err) {
      console.error(err);
      setResult({ direction: 'ERROR', confidence: 0, insight: 'Failed to connect to backend.' });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
      
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold font-heading text-white flex items-center gap-4">
          <Brain className="text-primary w-10 h-10" /> DeepSeek Pattern AI
        </h1>
        <p className="text-textMuted max-w-2xl text-lg">Upload your chart screenshot or pattern file. Our proprietary AI engine will perform institutional-grade multi-timeframe analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        
        {/* Upload Area */}
        <div className="glass-panel p-8 border-dashed border-2 border-white/20 hover:border-primary/50 transition bg-surface/30 flex flex-col items-center justify-center text-center min-h-[400px]">
          <UploadCloud size={64} className="text-textMuted mb-6" />
          <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Chart</h3>
          <p className="text-textMuted text-sm mb-8">Supports PNG, JPG, or TradingView Export JSON</p>
          <button 
            onClick={handleUpload}
            disabled={analyzing}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-8 rounded-full transition"
          >
            {analyzing ? 'Scanning Patterns...' : 'Select File to Analyze'}
          </button>
        </div>

        {/* Results Area */}
        <div className="flex flex-col gap-6">
          <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">Analysis Result</h3>
          
          {analyzing && (
            <div className="glass-card p-10 flex flex-col items-center justify-center flex-1">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(0,209,255,0.4)]"></div>
              <p className="text-primary font-bold animate-pulse">Running DeepSeek Engine...</p>
            </div>
          )}

          {!analyzing && !result && (
            <div className="glass-card p-10 flex flex-col items-center justify-center flex-1 opacity-50">
              <AlertTriangle size={48} className="text-textMuted mb-4" />
              <p className="text-textMuted font-medium text-center">Awaiting chart input. Upload a file to generate insights.</p>
            </div>
          )}

          {result && (
            <div className="glass-card p-8 flex flex-col gap-6 border border-error/30 bg-gradient-to-br from-error/10 to-transparent relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-error/20 blur-3xl rounded-full"></div>
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs uppercase font-bold text-textMuted tracking-wider mb-1 block">Predicted Direction</span>
                  <h2 className="text-4xl font-black text-error flex items-center gap-3">
                    <TrendingDown size={32} /> {result.direction}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase font-bold text-textMuted tracking-wider mb-1 block">Confidence</span>
                  <div className="text-3xl font-bold text-white">{result.confidence}%</div>
                </div>
              </div>

              <div className="bg-background/50 rounded-lg p-5 border border-white/5">
                <span className="text-xs uppercase font-bold text-primary mb-2 flex items-center gap-2"><CheckCircle2 size={14}/> Trade Insight</span>
                <p className="text-sm font-medium leading-relaxed">{result.insight}</p>
              </div>

              <button className="w-full py-4 bg-error text-background font-bold text-lg rounded-lg hover:bg-error/90 transition shadow-[0_0_20px_rgba(255,180,171,0.2)] mt-auto">
                Execute Short Target
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AIAnalysis;
