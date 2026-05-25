import React, { useEffect, useRef, useState } from 'react'
import { useMarketStore } from '../store/useMarketStore'
import CandleChart from '../components/charts/CandleChart'
import { Clock } from 'lucide-react'

const INTERVALS = ['1m', '5m', '15m', '1h', '4h', '1d'] as const

const Charts: React.FC = () => {
  const {
    markets, selectedMarket, candles,
    fetchMarkets, fetchMarket, fetchCandles,
    setSelectedMarket, setSelectedInterval, selectedInterval,
  } = useMarketStore()
  
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => {
    fetchMarkets(20)
  }, [fetchMarkets])

  useEffect(() => {
    if (markets.length > 0 && !selectedMarket) {
      const defaultMarket = markets.find((m) => m.symbol === 'BTC/USDT') || markets[0]
      setSelectedMarket(defaultMarket)
    }
  }, [markets, selectedMarket, setSelectedMarket])

  useEffect(() => {
    if (selectedMarket) {
      if (!candles || candles.length === 0) {
        fetchCandles(selectedMarket.symbol, selectedInterval)
      } else {
        const intervalId = setInterval(() => {
          fetchCandles(selectedMarket.symbol, selectedInterval)
        }, 30000)
        return () => clearInterval(intervalId)
      }
    }
  }, [selectedMarket, selectedInterval, fetchCandles, candles])

  const handleInterval = (interval: string) => {
    if (interval === selectedInterval) return
    setSelectedInterval(interval)
    if (selectedMarket) {
      fetchCandles(selectedMarket.symbol, interval)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: window.innerHeight - 300
        })
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-500 pt-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="section-title mb-2">Crypto Charts</h1>
            <p className="body-text text-text-secondary">Analyze price movements for your favorite assets.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 outline-none focus:border-primary/50 transition-all text-white"
              value={selectedMarket?.symbol || ''}
              onChange={(e) => {
                const target = markets.find(m => m.symbol === e.target.value)
                if (target) {
                  setSelectedMarket(target)
                  fetchCandles(target.symbol, selectedInterval)
                }
              }}
            >
              <option value="" disabled>Select Market</option>
              {markets.map(m => (
                <option key={m.symbol} value={m.symbol} className="bg-background text-white">{m.symbol}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="glass-card p-6" ref={containerRef}>
          {/* Interval selector */}
          <div className="flex items-center gap-2 mb-6 bg-white/5 p-2 rounded-lg w-fit">
            <Clock size={16} className="text-text-secondary ml-2 mr-1" />
            {INTERVALS.map((iv) => (
              <button
                key={iv}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedInterval === iv 
                    ? 'bg-primary text-black' 
                    : 'text-text-secondary hover:text-white hover:bg-white/10'
                }`}
                onClick={() => handleInterval(iv)}
              >
                {iv}
              </button>
            ))}
          </div>

          {/* Candle chart */}
          <div className="w-full overflow-hidden border border-white/5 rounded-xl bg-black/20">
            {candles && candles.length > 0 ? (
              <CandleChart candles={candles} width={dimensions.width - 48} height={dimensions.height} />
            ) : (
              <div className="flex items-center justify-center text-text-secondary" style={{ height: dimensions.height }}>
                Loading chart data...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charts