'use client'

import { useEffect, useRef, useState } from 'react'
import type { Grade, Restaurant } from '@/lib/types'
import { LocateFixed, Minus, Plus } from 'lucide-react'

interface RealMapProps {
  restaurants: Restaurant[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  activeLocality?: string
}

const LOCALITY_COORDS: Record<string, [number, number]> = {
  'Banjara Hills': [17.4239, 78.4482],
  'Jubilee Hills': [17.4319, 78.4073],
  'Hitech City': [17.4474, 78.3762],
  'Gachibowli': [17.4398, 78.3685],
  'Madhapur': [17.4485, 78.3908],
  'Kondapur': [17.4619, 78.3612],
  'Charminar': [17.3615, 78.4735],
  'Secunderabad': [17.4416, 78.4871],
  'Begumpet': [17.4447, 78.4664],
  'Abids': [17.3912, 78.4764],
}

const HYDERABAD_CENTER: [number, number] = [17.425, 78.42]

export function RealMap({ restaurants, selectedId, onSelect, activeLocality }: RealMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const tileLayerRef = useRef<any>(null)
  const markersLayerRef = useRef<any>(null)
  const [mapReady, setMapReady] = useState(false)

  // Initialize Map
  useEffect(() => {
    let isCancelled = false

    async function init() {
      if (!containerRef.current || mapRef.current) return

      const L = await import('leaflet')
      if (isCancelled || !containerRef.current) return

      const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

      const map = L.map(containerRef.current, {
        center: HYDERABAD_CENTER,
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
      })

      const tileLayer = L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
      }).addTo(map)

      const markersGroup = L.layerGroup().addTo(map)

      mapRef.current = map
      tileLayerRef.current = tileLayer
      markersLayerRef.current = markersGroup
      setMapReady(true)

      // Click on background map to deselect
      map.on('click', (e: any) => {
        if (e.originalEvent?.defaultPrevented) return
        onSelect(null)
      })
    }

    init()

    return () => {
      isCancelled = true
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        tileLayerRef.current = null
        markersLayerRef.current = null
      }
    }
  }, [])

  // Render & Update Markers
  useEffect(() => {
    if (!mapReady || !mapRef.current || !markersLayerRef.current) return

    let isCancelled = false
    import('leaflet').then((L) => {
      if (isCancelled || !markersLayerRef.current) return

      markersLayerRef.current.clearLayers()

      const colors: Record<Grade, { bg: string; text: string }> = {
        A: { bg: '#10b981', text: '#ffffff' },
        B: { bg: '#f59e0b', text: '#ffffff' },
        C: { bg: '#f97316', text: '#ffffff' },
        FAILED: { bg: '#ef4444', text: '#ffffff' },
      }

      restaurants.forEach((r) => {
        if (!r.lat || !r.lng) return

        const isSelected = r.id === selectedId
        const color = colors[r.grade] || colors.A
        const label = r.grade === 'FAILED' ? 'F' : r.grade
        const size = isSelected ? 42 : 34

        const html = `
          <div style="
            width: ${size}px;
            height: ${size}px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.25));
            transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            ${isSelected ? 'transform: scale(1.18); z-index: 999;' : ''}
          ">
            <div style="
              width: ${size - 4}px;
              height: ${size - 4}px;
              border-radius: 50% 50% 0 50%;
              transform: rotate(-45deg);
              background: ${color.bg};
              border: 2.5px solid #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <span style="
                transform: rotate(45deg);
                font-family: system-ui, sans-serif;
                font-size: ${isSelected ? '14px' : '12px'};
                font-weight: 800;
                color: ${color.text};
              ">${label}</span>
            </div>
          </div>
        `

        const icon = L.divIcon({
          html,
          className: 'custom-map-pin',
          iconSize: [size, size],
          iconAnchor: [size / 2, size],
        })

        const marker = L.marker([r.lat, r.lng], { icon })
        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e)
          onSelect(r.id)
        })

        markersLayerRef.current.addLayer(marker)
      })
    })

    return () => {
      isCancelled = true
    }
  }, [mapReady, restaurants, selectedId])

  // Fly to selected restaurant
  useEffect(() => {
    if (!mapReady || !mapRef.current || !selectedId) return
    const target = restaurants.find((r) => r.id === selectedId)
    if (target?.lat && target?.lng) {
      mapRef.current.flyTo([target.lat, target.lng], 16, {
        duration: 1.0,
        easeLinearity: 0.25,
      })
    }
  }, [mapReady, selectedId, restaurants])

  // Fly to selected locality
  useEffect(() => {
    if (!mapReady || !mapRef.current || !activeLocality || activeLocality === 'all') return
    const coords = LOCALITY_COORDS[activeLocality]
    if (coords) {
      mapRef.current.flyTo(coords, 14, {
        duration: 1.0,
      })
    }
  }, [mapReady, activeLocality])

  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn()
  }

  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut()
  }

  const handleReset = () => {
    if (mapRef.current) {
      mapRef.current.flyTo(HYDERABAD_CENTER, 12, { duration: 1.0 })
      onSelect(null)
    }
  }

  return (
    <div className="relative w-full h-full min-h-[440px] sm:min-h-[520px] rounded-2xl overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 z-0 bg-background" />

      {/* Map Control Buttons */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={handleZoomIn}
          className="inline-flex size-10 items-center justify-center border-b border-border text-foreground hover:bg-muted"
        >
          <Plus className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={handleZoomOut}
          className="inline-flex size-10 items-center justify-center border-b border-border text-foreground hover:bg-muted"
        >
          <Minus className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Reset Hyderabad View"
          onClick={handleReset}
          className="inline-flex size-10 items-center justify-center text-foreground hover:bg-muted"
        >
          <LocateFixed className="size-4" />
        </button>
      </div>
    </div>
  )
}
