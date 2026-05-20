import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera, CameraOff, Mic, MicOff, X, Minimize2, Maximize2,
  RefreshCw, Wifi, Zap, Monitor, User, Aperture, ScanFace,
  Radio, ChevronUp, Settings
} from 'lucide-react';

type PairingPhase = 'idle' | 'searching' | 'found' | 'connected';
type CameraEffect = 'none' | 'center-stage' | 'portrait' | 'desk-view';
type FacingMode = 'user' | 'environment';

interface IPhoneCameraProps {
  isStreaming?: boolean; // true when a Watch Together / Discover stream is active
}

const EFFECTS: { id: CameraEffect; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'none',         label: 'Off',          icon: <CameraOff className="w-4 h-4" />,  desc: 'No effects applied' },
  { id: 'center-stage', label: 'Center Stage', icon: <ScanFace className="w-4 h-4" />,   desc: 'Auto-tracks your face' },
  { id: 'portrait',     label: 'Portrait',     icon: <Aperture className="w-4 h-4" />,   desc: 'Background blur' },
  { id: 'desk-view',    label: 'Desk View',    icon: <Monitor className="w-4 h-4" />,    desc: 'Wide overhead angle' },
];

function IPhoneFrame({ children, effect }: { children: React.ReactNode; effect: CameraEffect }) {
  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-2 border-white/20 shadow-2xl">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-20 h-5 bg-black rounded-b-2xl flex items-center justify-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-3 h-3 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </div>
      </div>

      {/* Video + effects */}
      <div
        className="w-full h-full relative overflow-hidden"
        style={{
          filter: effect === 'portrait' ? 'none' : undefined,
        }}
      >
        {children}

        {/* Portrait mode overlay — radial mask fades out edges */}
        {effect === 'portrait' && (
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 70% at 50% 45%, transparent 40%, rgba(0,0,0,0.65) 100%)',
            }}
          />
        )}

        {/* Desk View zoom indicator */}
        {effect === 'desk-view' && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
            <Monitor className="w-3 h-3 text-white/60" />
            <span className="text-white/60 text-xs">Desk View · 0.5×</span>
          </div>
        )}

        {/* Center Stage scanning line */}
        {effect === 'center-stage' && (
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent pointer-events-none"
            animate={{ top: ['15%', '80%', '15%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* Side buttons */}
      <div className="absolute right-0 top-16 w-1 h-10 bg-white/20 rounded-l-full" />
      <div className="absolute left-0 top-12 w-1 h-8 bg-white/20 rounded-r-full" />
      <div className="absolute left-0 top-24 w-1 h-8 bg-white/20 rounded-r-full" />
    </div>
  );
}

function PairingScreen({ onConnected, onCancel }: { onConnected: () => void; onCancel: () => void }) {
  const [phase, setPhase] = useState<PairingPhase>('searching');
  const [dots, setDots] = useState('');

  useEffect(() => {
    const d1 = setTimeout(() => setPhase('found'), 2200);
    const d2 = setTimeout(() => setPhase('connected'), 3800);
    const d3 = setTimeout(() => onConnected(), 4400);
    return () => { clearTimeout(d1); clearTimeout(d2); clearTimeout(d3); };
  }, [onConnected]);

  useEffect(() => {
    const iv = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 500);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 24, stiffness: 280 }}
        className="relative w-[420px] backdrop-blur-2xl bg-gradient-to-b from-slate-900/98 via-slate-900/95 to-slate-950/98 border border-white/10 rounded-[36px] shadow-2xl overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/10 blur-3xl rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-400/30 rounded-xl flex items-center justify-center">
              <Camera className="w-4 h-4 text-blue-300" />
            </div>
            <span className="text-white font-bold">Continuity Camera</span>
          </div>
          <button onClick={onCancel} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-4 h-4 text-white/50" />
          </button>
        </div>

        {/* Main visual */}
        <div className="flex items-center justify-center py-8 relative">
          {/* Apple TV box */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-20 h-5 bg-gradient-to-b from-slate-700 to-slate-800 rounded-lg border border-white/10 flex items-center justify-center">
              <span className="text-white/40 text-[8px] font-bold tracking-widest">Apple TV</span>
            </div>
            <div className="w-2 h-4 bg-slate-700 rounded-sm" />
          </div>

          {/* Connecting waves */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className={`absolute rounded-full border ${
                  phase === 'connected'
                    ? 'border-green-400/40'
                    : phase === 'found'
                    ? 'border-blue-400/40'
                    : 'border-white/15'
                }`}
                initial={{ width: 60, height: 60, opacity: 0.6 }}
                animate={{ width: 60 + i * 50, height: 60 + i * 50, opacity: 0 }}
                transition={{ duration: 1.8, delay: i * 0.55, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}
          </div>

          {/* Connection line */}
          <div className="w-32 mx-4 relative flex items-center z-10">
            <div className={`h-px w-full transition-colors duration-500 ${
              phase === 'connected' ? 'bg-gradient-to-r from-slate-600 via-green-400 to-blue-400'
              : phase === 'found'   ? 'bg-gradient-to-r from-slate-600 via-blue-400 to-slate-600'
              : 'bg-white/10'
            }`} />
            {phase !== 'searching' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center ${
                  phase === 'connected' ? 'bg-green-400' : 'bg-blue-400'
                }`}
              >
                {phase === 'connected'
                  ? <Zap className="w-2.5 h-2.5 text-white" />
                  : <Wifi className="w-2.5 h-2.5 text-white" />
                }
              </motion.div>
            )}
            {phase === 'searching' && (
              <motion.div
                className="absolute left-0 w-6 h-px bg-white/60 blur-sm"
                animate={{ left: ['0%', '100%', '0%'] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>

          {/* iPhone silhouette */}
          <motion.div
            animate={phase === 'connected' ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.4 }}
            className="z-10 flex flex-col items-center gap-1"
          >
            <div className={`w-12 h-20 rounded-2xl border-2 flex flex-col items-center justify-between py-2 transition-colors duration-500 ${
              phase === 'connected' ? 'border-green-400/70 bg-green-400/10'
              : phase === 'found'   ? 'border-blue-400/70 bg-blue-400/10'
              : 'border-white/20 bg-white/5'
            }`}>
              {/* Notch */}
              <div className="w-5 h-1.5 bg-white/20 rounded-full" />
              {/* Screen */}
              <div className={`w-8 h-10 rounded-lg transition-colors duration-500 ${
                phase === 'connected' ? 'bg-green-400/30'
                : phase === 'found'   ? 'bg-blue-400/20'
                : 'bg-white/5'
              } flex items-center justify-center`}>
                <Camera className={`w-4 h-4 transition-colors duration-500 ${
                  phase === 'connected' ? 'text-green-300'
                  : phase === 'found'   ? 'text-blue-300'
                  : 'text-white/20'
                }`} />
              </div>
              {/* Home pill */}
              <div className="w-4 h-1 bg-white/20 rounded-full" />
            </div>
            <span className="text-white/40 text-xs">iPhone 15 Pro</span>
          </motion.div>
        </div>

        {/* Status text */}
        <div className="px-6 pb-6 text-center space-y-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`font-semibold ${
                phase === 'connected' ? 'text-green-300'
                : phase === 'found'   ? 'text-blue-300'
                : 'text-white'
              }`}
            >
              {phase === 'searching' && `Searching for iPhone${dots}`}
              {phase === 'found'     && '📱 iPhone 15 Pro found!'}
              {phase === 'connected' && '✅ Connected · Center Stage On'}
            </motion.p>
          </AnimatePresence>
          <p className="text-white/40 text-sm">
            {phase === 'connected'
              ? 'Your iPhone camera is now active'
              : 'Make sure your iPhone is nearby with Bluetooth on'}
          </p>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {(['searching', 'found', 'connected'] as PairingPhase[]).map((s, i) => (
              <div key={s} className={`h-1 rounded-full transition-all duration-500 ${
                phase === s ? 'w-6 bg-blue-400'
                : ['found', 'connected'].includes(phase) && i < ['searching', 'found', 'connected'].indexOf(phase)
                  ? 'w-3 bg-green-400'
                  : 'w-3 bg-white/15'
              }`} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function IPhoneCamera({ isStreaming = false }: IPhoneCameraProps) {
  const [open, setOpen] = useState(false);
  const [pairing, setPairing] = useState(false);
  const [connected, setConnected] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [facing, setFacing] = useState<FacingMode>('user');
  const [effect, setEffect] = useState<CameraEffect>('center-stage');
  const [showEffects, setShowEffects] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [pos, setPos] = useState({ x: 24, y: 100 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async (facingMode: FacingMode) => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setPermissionDenied(false);
    } catch {
      setPermissionDenied(true);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  useEffect(() => {
    if (connected && cameraOn) {
      startCamera(facing);
    } else {
      stopCamera();
    }
  }, [connected, cameraOn, facing, startCamera, stopCamera]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 220, e.clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 360, e.clientY - dragOffset.current.y)),
      });
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging]);

  const handleConnect = () => { setOpen(false); setPairing(true); };
  const handleConnected = () => { setPairing(false); setConnected(true); };
  const handleDisconnect = () => {
    setConnected(false); setPairing(false); setOpen(false);
    setCameraOn(true); setMicOn(true); setMinimized(false);
    setShowEffects(false); stopCamera();
  };

  const flipCamera = () => {
    setFacing(f => f === 'user' ? 'environment' : 'user');
  };

  const currentEffect = EFFECTS.find(e => e.id === effect)!;

  return (
    <>
      {/* ── Navbar trigger button (rendered inline, used by Navbar parent) ── */}
      {/* The button is exported separately so Navbar can render it */}

      {/* ── Pairing screen ── */}
      <AnimatePresence>
        {pairing && (
          <PairingScreen
            onConnected={handleConnected}
            onCancel={() => { setPairing(false); }}
          />
        )}
      </AnimatePresence>

      {/* ── Connect modal ── */}
      <AnimatePresence>
        {open && !connected && !pairing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 16 }}
              onClick={e => e.stopPropagation()}
              className="relative w-96 backdrop-blur-2xl bg-gradient-to-b from-slate-900/98 to-slate-950/98 border border-white/10 rounded-[32px] shadow-2xl p-6 space-y-4"
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-4 h-4 text-white/50" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-cyan-400/20 border border-blue-400/30 rounded-2xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-white font-black">iPhone Camera</h3>
                  <p className="text-white/40 text-sm">Continuity Camera for AnimeTV</p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { icon: <ScanFace className="w-4 h-4 text-blue-300" />, label: 'Center Stage', desc: 'Keeps you framed while you watch' },
                  { icon: <Aperture className="w-4 h-4 text-purple-300" />, label: 'Portrait Mode', desc: 'Cinematic background blur' },
                  { icon: <Monitor className="w-4 h-4 text-green-300" />, label: 'Desk View', desc: 'Wide overhead angle' },
                  { icon: <Radio className="w-4 h-4 text-red-300" />, label: 'Live to Stream', desc: 'Share your reactions while watching' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 bg-white/5 rounded-2xl p-3">
                    <div className="p-1.5 bg-white/5 rounded-xl">{item.icon}</div>
                    <div>
                      <p className="text-white text-sm font-semibold">{item.label}</p>
                      <p className="text-white/40 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleConnect}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-2xl text-white font-bold transition-all shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2"
              >
                <Wifi className="w-4 h-4" />
                Connect iPhone Camera
              </motion.button>
              <p className="text-white/25 text-xs text-center">Requires iPhone nearby with Bluetooth &amp; Wi-Fi on</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Connected PiP ── */}
      <AnimatePresence>
        {connected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="fixed z-[80] select-none"
            style={{ left: pos.x, top: pos.y, width: minimized ? 72 : 200 }}
          >
            {minimized ? (
              /* ── Minimized pill ── */
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMinimized(false)}
                className="w-full flex items-center gap-2 backdrop-blur-2xl bg-slate-900/90 border border-white/15 rounded-full px-3 py-2 shadow-xl"
              >
                <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-red-500 animate-pulse' : 'bg-green-400'}`} />
                <Camera className="w-4 h-4 text-white/70" />
              </motion.button>
            ) : (
              <div className="flex flex-col gap-2">
                {/* Drag handle */}
                <div
                  onMouseDown={onMouseDown}
                  className={`cursor-grab active:cursor-grabbing w-full backdrop-blur-2xl border rounded-[28px] overflow-hidden shadow-2xl ${
                    isStreaming
                      ? 'border-red-400/40 shadow-red-900/30'
                      : 'border-white/15 shadow-black/50'
                  }`}
                  style={{ height: 260 }}
                >
                  {/* Status bar */}
                  <div className={`flex items-center justify-between px-3 py-2 ${
                    isStreaming ? 'bg-red-950/80' : 'bg-slate-950/80'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      {isStreaming
                        ? <><div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /><span className="text-red-300 text-xs font-bold">LIVE</span></>
                        : <><div className="w-1.5 h-1.5 bg-green-400 rounded-full" /><span className="text-green-300 text-xs font-bold">CAM</span></>
                      }
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setMinimized(true)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <Minimize2 className="w-3 h-3 text-white/50" />
                      </button>
                      <button onClick={handleDisconnect} className="p-1 hover:bg-red-500/20 rounded-full transition-colors">
                        <X className="w-3 h-3 text-white/50" />
                      </button>
                    </div>
                  </div>

                  {/* Camera view */}
                  <IPhoneFrame effect={effect}>
                    <div className="w-full h-full bg-slate-900 relative">
                      {cameraOn && !permissionDenied ? (
                        <video
                          ref={videoRef}
                          autoPlay
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                          style={{
                            transform: `${facing === 'user' ? 'scaleX(-1)' : ''} ${effect === 'desk-view' ? 'scale(0.72)' : effect === 'center-stage' ? 'scale(1.08)' : ''}`,
                            transition: 'transform 0.6s ease',
                          }}
                        />
                      ) : permissionDenied ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-900">
                          <CameraOff className="w-8 h-8 text-white/20" />
                          <p className="text-white/30 text-xs text-center px-3">Camera permission denied</p>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900">
                          <User className="w-10 h-10 text-white/10" />
                        </div>
                      )}

                      {/* Effect label */}
                      {effect !== 'none' && (
                        <div className="absolute top-7 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1 pointer-events-none">
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                          <span className="text-white/70 text-xs">{currentEffect.label}</span>
                        </div>
                      )}

                      {/* Center Stage face box */}
                      {effect === 'center-stage' && cameraOn && !permissionDenied && (
                        <motion.div
                          className="absolute border-2 border-green-400/60 rounded-xl pointer-events-none"
                          animate={{
                            left: '28%', top: '15%',
                            width: '44%', height: '55%',
                          }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        >
                          {/* Corner accents */}
                          {[
                            'top-0 left-0 border-t-2 border-l-2',
                            'top-0 right-0 border-t-2 border-r-2',
                            'bottom-0 left-0 border-b-2 border-l-2',
                            'bottom-0 right-0 border-b-2 border-r-2',
                          ].map((cls, i) => (
                            <div key={i} className={`absolute w-3 h-3 border-green-400 ${cls}`} style={{ borderColor: 'rgb(74 222 128 / 0.8)' }} />
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </IPhoneFrame>
                </div>

                {/* Controls bar */}
                <div className="backdrop-blur-2xl bg-slate-900/90 border border-white/10 rounded-2xl px-3 py-2 flex items-center justify-between gap-2">
                  {/* Cam on/off */}
                  <button
                    onClick={() => setCameraOn(c => !c)}
                    className={`p-2 rounded-full transition-colors ${cameraOn ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500/20 border border-red-400/30'}`}
                  >
                    {cameraOn ? <Camera className="w-4 h-4 text-white" /> : <CameraOff className="w-4 h-4 text-red-400" />}
                  </button>

                  {/* Mic on/off */}
                  <button
                    onClick={() => setMicOn(m => !m)}
                    className={`p-2 rounded-full transition-colors ${micOn ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500/20 border border-red-400/30'}`}
                  >
                    {micOn ? <Mic className="w-4 h-4 text-white" /> : <MicOff className="w-4 h-4 text-red-400" />}
                  </button>

                  {/* Flip */}
                  <button
                    onClick={flipCamera}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 text-white" />
                  </button>

                  {/* Effects */}
                  <div className="relative">
                    <button
                      onClick={() => setShowEffects(s => !s)}
                      className={`p-2 rounded-full transition-colors ${showEffects ? 'bg-purple-500/30 border border-purple-400/40' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                      <Zap className="w-4 h-4 text-white" />
                    </button>

                    <AnimatePresence>
                      {showEffects && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          className="absolute bottom-full mb-2 right-0 w-48 backdrop-blur-2xl bg-slate-900/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                        >
                          <p className="text-white/40 text-xs px-3 pt-3 pb-1 font-semibold tracking-wider">VIDEO EFFECTS</p>
                          {EFFECTS.map(ef => (
                            <button
                              key={ef.id}
                              onClick={() => { setEffect(ef.id); setShowEffects(false); }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/5 transition-colors ${effect === ef.id ? 'text-white' : 'text-white/60'}`}
                            >
                              <div className={`p-1.5 rounded-xl ${effect === ef.id ? 'bg-purple-500/30 border border-purple-400/30' : 'bg-white/5'}`}>
                                {ef.icon}
                              </div>
                              <div className="text-left">
                                <p className="text-xs font-semibold">{ef.label}</p>
                                <p className="text-white/30 text-xs">{ef.desc}</p>
                              </div>
                              {effect === ef.id && <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Expand/settings */}
                  <button
                    onClick={() => setMinimized(true)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Minimize2 className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Streaming indicator */}
                {isStreaming && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 bg-red-500/15 border border-red-400/25 rounded-2xl px-3 py-2"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-300 text-xs font-semibold">Broadcasting to live stream</span>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expose trigger — a floating button always visible when not connected */}
      {!connected && !pairing && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 z-[70] flex items-center gap-2.5 backdrop-blur-2xl bg-gradient-to-r from-blue-600/80 to-cyan-500/80 hover:from-blue-500/90 hover:to-cyan-400/90 border border-blue-400/30 rounded-full px-5 py-3 shadow-2xl shadow-blue-900/40 transition-all"
        >
          <Camera className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-semibold">Connect iPhone</span>
          <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
        </motion.button>
      )}
    </>
  );
}
