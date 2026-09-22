import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Mic,
  RotateCcw,
  Square,
  Sparkles,
  ArrowLeft,
  Database,
  Send,
  FileCheck,
} from 'lucide-react';
import { DoctorQueuePatient, LanguageCode } from '../types';

interface DoctorDashboardProps {
  patients: DoctorQueuePatient[];
  activePatientId: number;
  onSelectPatient: (id: number) => void;
  onConfirmPatient: (id: number) => void;
  onUpdateNotes: (id: number, notes: string) => void;
  onDictateNotes: () => void;
  onStopDictation: () => void;
  isDictating: boolean;
  dictationTranscript: string;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  patients,
  activePatientId,
  onSelectPatient,
  onConfirmPatient,
  onUpdateNotes,
  onDictateNotes,
  onStopDictation,
  isDictating,
  dictationTranscript,
}) => {
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

  // Red flags first
  const sortedPatients = [...patients].sort(
    (a, b) => (b.isRedFlag ? 1 : 0) - (a.isRedFlag ? 1 : 0)
  );

  const activePatient =
    patients.find((p) => p.id === activePatientId) || sortedPatients[0];

  return (
    <div className="space-y-4">
      {/* Dashboard Top banner */}
      <div className="bg-white border border-[#D7E6E1] rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-[#0F2F4A]">
              Outpatient Clinical Consultation Queue
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DDEFE2] text-[#1C6B3A]">
              Live OPD Sync
            </span>
          </div>
          <p className="text-xs text-[#4C7C72] mt-0.5">
            Cases pre-triaged via multilingual voice AI intake before entering room
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FCEBE7] border border-[#ECC0B6] text-xs font-bold text-[#7A2E22]">
            <AlertTriangle className="w-3.5 h-3.5 text-[#B54A3B]" />
            <span>
              {patients.filter((p) => p.isRedFlag).length} Flagged High Priority
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EEF3EF] border border-[#D7E6E1] text-xs font-bold text-[#1B4E7A]">
            <Users className="w-3.5 h-3.5" />
            <span>{patients.length} Waiting</span>
          </div>
        </div>
      </div>

      {/* Grid: Left Patient Queue, Right Case Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Queue List */}
        <div
          className={`md:col-span-4 bg-white border border-[#D7E6E1] rounded-2xl overflow-hidden shadow-xs ${
            mobileShowDetail ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="p-3.5 border-b border-[#D7E6E1] flex items-center justify-between bg-[#F8FAF8]">
            <span className="text-xs font-bold text-[#4C7C72] uppercase tracking-wider">
              Waiting Patients ({sortedPatients.length})
            </span>
            <span className="text-[11px] text-gray-500 font-medium">Sorted by Triage</span>
          </div>

          <div className="divide-y divide-gray-100 max-h-[640px] overflow-y-auto">
            {sortedPatients.map((p) => {
              const isSelected = activePatient && activePatient.id === p.id;
              return (
                <button
                  key={p.id}
                  id={`queue-item-${p.id}`}
                  type="button"
                  onClick={() => {
                    onSelectPatient(p.id);
                    setMobileShowDetail(true);
                  }}
                  className={`w-full text-left p-4 transition-all flex flex-col gap-1.5 border-l-4 ${
                    isSelected
                      ? 'bg-[#EEF3EF] border-l-[#1B4E7A]'
                      : 'hover:bg-gray-50 border-l-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between text-sm font-bold text-[#0F2F4A]">
                    <span>{p.name}, {p.age}{p.gender}</span>
                    <span className="text-xs font-medium text-[#4C7C72] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {p.waitTime}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {p.chiefComplaint}
                  </p>

                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    {p.isRedFlag && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FCEBE7] text-[#7A2E22]">
                        <AlertTriangle className="w-3 h-3 text-[#B54A3B]" />
                        Flagged
                      </span>
                    )}
                    {p.isConfirmed && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDEFE2] text-[#1C6B3A]">
                        <CheckCircle2 className="w-3 h-3" />
                        ABDM Synced
                      </span>
                    )}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {p.languageUsed}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Patient Detail Review Pane */}
        {activePatient ? (
          <div
            className={`md:col-span-8 bg-white border border-[#D7E6E1] rounded-2xl p-5 shadow-xs space-y-5 ${
              mobileShowDetail ? 'block' : 'hidden md:block'
            }`}
          >
            {/* Mobile back button */}
            <button
              type="button"
              onClick={() => setMobileShowDetail(false)}
              className="md:hidden flex items-center gap-1.5 text-xs font-bold text-[#1B4E7A] mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Patient Queue</span>
            </button>

            {/* Patient Header */}
            <div className="flex items-start justify-between gap-4 flex-wrap border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-[#0F2F4A]">
                    {activePatient.name}
                  </h3>
                  <span className="text-xs font-bold text-gray-500">
                    ({activePatient.age} y/o, {activePatient.gender})
                  </span>
                </div>
                <p className="text-xs text-[#4C7C72] mt-0.5">
                  Spoke in <span className="font-bold">{activePatient.languageUsed}</span> · Waiting {activePatient.waitTime}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    activePatient.isAbdmLinked
                      ? 'bg-[#DDEFE2] text-[#1C6B3A]'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>{activePatient.isAbdmLinked ? 'ABDM Verified' : 'ABDM Pending'}</span>
                </span>

                {activePatient.isRedFlag && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#FCEBE7] text-[#7A2E22] border border-[#ECC0B6]">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#B54A3B]" />
                    <span>Priority Review</span>
                  </span>
                )}
              </div>
            </div>

            {/* AI Summary and Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Summary */}
              <div className="bg-[#F8FAF8] border border-[#D7E6E1] rounded-xl p-4">
                <h4 className="text-xs font-bold text-[#4C7C72] uppercase tracking-wider mb-3">
                  AI-Organized Case Summary
                </h4>
                <div className="space-y-2 text-xs">
                  {activePatient.summary.map((item, i) => (
                    <div key={i} className="pb-1.5 border-b border-gray-100 last:border-0">
                      <span className="text-gray-500 font-medium block">{item.label}</span>
                      <span className="font-bold text-[#0F2F4A] block mt-0.5">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-[#F8FAF8] border border-[#D7E6E1] rounded-xl p-4">
                <h4 className="text-xs font-bold text-[#4C7C72] uppercase tracking-wider mb-3">
                  Medical Timeline & Reports
                </h4>
                <div className="relative pl-4 border-l-2 border-[#D7E6E1] space-y-3 text-xs">
                  {activePatient.timeline.map((item, i) => (
                    <div key={i} className="relative">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#1B4E7A] ring-4 ring-white" />
                      <span className="text-[10px] font-bold text-[#4C7C72] block">
                        {item.date}
                      </span>
                      <span className="font-bold text-[#0F2F4A] block mt-0.5">
                        {item.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Doctor's Notes with Voice Dictation */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="doctor-notes"
                  className="text-xs font-bold text-[#4C7C72] uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Doctor's Clinical Notes & Prescription</span>
                  <span className="text-[10px] text-gray-500 font-normal">
                    (Speak or type)
                  </span>
                </label>

                {/* Voice Dictation Button */}
                <div className="flex items-center gap-1.5">
                  <button
                    id="doctor-dictate-btn"
                    type="button"
                    onClick={isDictating ? onStopDictation : onDictateNotes}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      isDictating
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-[#EEF3EF] hover:bg-[#D7E6E1] text-[#1B4E7A]'
                    }`}
                    title={isDictating ? 'Stop dictation' : 'Dictate notes via voice'}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isDictating ? 'Stop Recording' : 'Voice Dictate'}</span>
                  </button>
                </div>
              </div>

              {isDictating && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  <span>Listening to doctor's dictation... speak clinical impression now.</span>
                </div>
              )}

              <textarea
                id="doctor-notes"
                rows={3}
                value={activePatient.clinicalNotes || ''}
                onChange={(e) => onUpdateNotes(activePatient.id, e.target.value)}
                placeholder="Add clinical impression, ICD-10 diagnosis, medications, or lab orders (or tap Voice Dictate to speak)..."
                className="w-full p-3 text-sm rounded-xl border border-[#D7E6E1] focus:ring-2 focus:ring-[#1B4E7A] focus:border-transparent outline-none transition-all resize-y"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between gap-3 pt-2 flex-wrap">
              <button
                type="button"
                onClick={() =>
                  onUpdateNotes(
                    activePatient.id,
                    'History reviewed and confirmed. Prescribed conservative care with 3-day follow up.'
                  )
                }
                className="text-xs font-semibold text-gray-500 hover:text-[#1B4E7A] underline"
              >
                Insert Standard Clinical Template
              </button>

              <button
                id="btn-confirm-abdm"
                type="button"
                onClick={() => onConfirmPatient(activePatient.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white transition-all shadow-sm active:scale-95 ${
                  activePatient.isConfirmed
                    ? 'bg-[#1C6B3A] hover:bg-[#15532c]'
                    : 'bg-[#1B4E7A] hover:bg-[#0F2F4A]'
                }`}
              >
                <FileCheck className="w-4 h-4" />
                <span>
                  {activePatient.isConfirmed
                    ? '✓ Case Confirmed & Synced to ABDM'
                    : 'Confirm & Sync to ABDM Health Record'}
                </span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
