import { useEffect, useState } from 'react';
import Card from '../../common/Card/Card';
import VideoPlayer from '../../../components/student/videos/VideoPlayer';
import type { Video } from '../../../types/VideoTypes';
import type { StudyWithStatus } from '../../../types/Study';
import {
  FileVideo,
  User,
  Calendar,
  ClipboardList,
  Video as VideoIcon,
  Info,
} from 'lucide-react';
import { useInteractions } from '../../../hooks/upload/useInteractions';
import { FileUploadRowTeacher, TeacherSelectionPayload } from './FileUploadRowTeacher';
import { useProtocolFlow } from '../../../hooks/student/ProtocolFlow/useProtocolFlow';

interface Props {
  url: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  togglePlay(): void;
  progress: number;
  handleSeek(e: React.ChangeEvent<HTMLInputElement>): void;
  isFullscreen: boolean;
  toggleFullscreen(): void;
  meta: Video;
  currentStudy?: StudyWithStatus;
}

export default function VideoSection({
  url,
  videoRef,
  isPlaying,
  togglePlay,
  progress,
  handleSeek,
  isFullscreen,
  toggleFullscreen,
  meta,
  currentStudy,
}: Props) {
  const { interactions, loadInteractions } = useInteractions();

  const [teacherSelection, setTeacherSelection] = useState<TeacherSelectionPayload>({});

  const {
    loadWindows,
    loadFindings,
    loadDiagnoses,
    loadSubdiagnoses,
    loadSubSubs,
    loadThirdOrders,
    loadImageQualities,
    loadFinalDiagnoses,
  } = useProtocolFlow(0);

  useEffect(() => {
    if (meta.id) {
      loadInteractions(meta.id);
    }
  }, [meta.id, loadInteractions]);

  // Cargamos catálogos extras de imageQualities/finalDiagnoses al montar
  useEffect(() => {
    loadImageQualities();
    loadFinalDiagnoses();
  }, [loadImageQualities, loadFinalDiagnoses]);

  return (
    <div className="w-full lg:w-2/3 space-y-6">
      {/* Video */}
      <Card className="rounded-[16px] overflow-hidden border border-slate-200 shadow-sm">
        <VideoPlayer
          src={url}
          videoRef={videoRef}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          progress={progress}
          handleSeek={handleSeek}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
        />
      </Card>

      {/* Detalles */}
      <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FileVideo className="h-5 w-5 text-[#4E81BD]" />
            <h3 className="text-[16px] font-semibold text-[#333333]">Detalles del video</h3>
          </div>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <DetailItem
            icon={<User className="h-5 w-5 text-[#4E81BD]" />}
            label="Estudiante"
            value={
              currentStudy
                ? `${currentStudy.first_name} ${currentStudy.last_name}`
                : 'No disponible'
            }
          />
          <DetailItem
            icon={<Calendar className="h-5 w-5 text-[#4E81BD]" />}
            label="Fecha de subida"
            value={new Date(meta.upload_date).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          />
          <DetailItem
            icon={<ClipboardList className="h-5 w-5 text-[#4E81BD]" />}
            label="Estudio"
            value={currentStudy?.title ?? 'No disponible'}
          />
          <DetailItem
            icon={<VideoIcon className="h-5 w-5 text-[#4E81BD]" />}
            label="Archivo"
            value={meta.original_filename}
          />
        </div>
      </Card>

      {/* Evaluación del estudiante (solo lectura) */}
      <Card className="rounded-[16px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-[#4E81BD]" />
            <h3 className="text-[16px] font-semibold text-[#333333]">Evaluación del estudiante</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {interactions.length > 0 ? (
            <>
              <div className="space-y-1">
                <p><strong>Protocolo:</strong> {interactions[0].protocolKey}</p>
                <p><strong>Ventana:</strong> {interactions[0].windowName}</p>
                <p><strong>Hallazgo:</strong> {interactions[0].findingName}</p>
                <p><strong>Diagnóstico:</strong> {interactions[0].possibleDiagnosisName}</p>
                {interactions[0].subdiagnosisName && (
                  <p><strong>Subdiagnóstico:</strong> {interactions[0].subdiagnosisName}</p>
                )}
                {interactions[0].subSubName && (
                  <p><strong>Sub-Sub:</strong> {interactions[0].subSubName}</p>
                )}
                {interactions[0].thirdOrderName && (
                  <p><strong>3er orden:</strong> {interactions[0].thirdOrderName}</p>
                )}
              </div>
              {interactions.map(i => (
                <p key={i.id}><strong>Comentario:</strong> {i.role === 'estudiante' ? i.comment : i.professorComment}</p>
              ))}
            </>
          ) : (
            <p className="text-sm text-[#666666]">No hay etiquetas ni comentarios.</p>
          )}
        </div>
      </Card>

      {/* Feedback del profesor: siempre visible, con estado local teacherSelection */}
      <FileUploadRowTeacher
        fileItem={teacherSelection}
        index={0}
        removeFile={() => {
          setTeacherSelection({});
        }}
        updateFileProtocol={(_, protocolKey) => {
          setTeacherSelection(prev => ({
            ...prev,
            protocolKey,
            windowId: undefined,
            findingId: undefined,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }));
          loadWindows(protocolKey);
        }}
        updateFileWindow={(windowId) => {
          setTeacherSelection(prev => ({
            ...prev,
            windowId,
            findingId: undefined,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }));
          if (teacherSelection.protocolKey) {
            loadFindings(teacherSelection.protocolKey, windowId);
          }
        }}
        updateFileFinding={(findingId) => {
          setTeacherSelection(prev => ({
            ...prev,
            findingId,
            diagnosisId: undefined,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }));
          if (
            teacherSelection.protocolKey &&
            teacherSelection.windowId != null
          ) {
            loadDiagnoses(
              teacherSelection.protocolKey,
              teacherSelection.windowId,
              findingId
            );
          }
        }}
        updateFileDiagnosis={(_, diagnosisId) => {
          setTeacherSelection(prev => ({
            ...prev,
            diagnosisId,
            subdiagnosisId: undefined,
            subSubId: undefined,
            thirdOrderId: undefined,
          }));
          if (
            teacherSelection.protocolKey &&
            teacherSelection.windowId != null &&
            teacherSelection.findingId != null
          ) {
            loadSubdiagnoses(
              teacherSelection.protocolKey,
              teacherSelection.windowId,
            );
          }
        }}
        updateFileSubdiagnosis={( subdiagnosisId) => {
          setTeacherSelection(prev => ({
            ...prev,
            subdiagnosisId,
            subSubId: undefined,
            thirdOrderId: undefined,
          }));
          if (
            teacherSelection.protocolKey &&
            teacherSelection.windowId != null &&
            teacherSelection.findingId != null &&
            teacherSelection.diagnosisId != null
          ) {
            loadSubSubs(
              teacherSelection.protocolKey,
              teacherSelection.windowId,
            );
          }
        }}
        updateFileSubSub={(subSubId) => {
          setTeacherSelection(prev => ({
            ...prev,
            subSubId,
            thirdOrderId: undefined,
          }));
          if (
            teacherSelection.protocolKey &&
            teacherSelection.windowId != null &&
            teacherSelection.findingId != null &&
            teacherSelection.diagnosisId != null &&
            teacherSelection.subdiagnosisId != null
          ) {
            loadThirdOrders(
              teacherSelection.protocolKey,
              teacherSelection.windowId,
            );
          }
        }}
        updateFileThirdOrder={(thirdOrderId) => {
          setTeacherSelection(prev => ({
            ...prev,
            thirdOrderId,
          }));
        }}
        updateFileImageQuality={(imageQualityId) => {
          setTeacherSelection(prev => ({
            ...prev,
            imageQualityId,
          }));
        }}
        updateFileFinalDiagnosis={(finalDiagnosisId) => {
          setTeacherSelection(prev => ({
            ...prev,
            finalDiagnosisId,
          }));
        }}
        updateFileComment={(_, comment) => {
          setTeacherSelection(prev => ({
            ...prev,
            comment,
          }));
        }}
        updateFileReady={(_, isReady) => {
          setTeacherSelection(prev => ({
            ...prev,
            isReady,
          }));
        }}
      />
    </div>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-[#4E81BD]/10 p-2 rounded-full">{icon}</div>
      <div>
        <h4 className="font-medium text-[#333333] mb-1">{label}</h4>
        <p className="text-[#666666]">{value}</p>
      </div>
    </div>
  );
}