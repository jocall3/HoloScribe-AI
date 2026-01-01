
export interface TranscriptSegment {
  participantId: string;
  participantName: string;
  text: string;
  timestamp: number;
  sentimentScore?: number;
  emotions?: { joy: number; sadness: number; anger: number; fear: number; surprise: number };
  keywords?: string[];
  intent?: string;
  agentAnnotations?: AgentAnnotation[];
  signature?: string;
}

export interface AgentAnnotation {
  agentId: string;
  type: 'anomaly_detection' | 'intent_confirmation' | 'sentiment_flag' | 'topic_highlight' | 'skill_invocation';
  description: string;
  confidence?: number;
  relatedInsightId?: string;
  timestamp: number;
}

export interface ActionItem {
  id: string;
  assigneeId: string;
  assigneeName: string;
  task: string;
  status: 'open' | 'in_progress' | 'completed' | 'deferred';
  dueDate: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  contextualTranscriptSegmentIds?: string[];
  notes?: string;
  createdBy: string;
  createdAt: number;
  updatedAt?: number;
  paymentRequestId?: string;
  signature?: string;
}

export interface DecisionRecord {
  id: string;
  summary: string;
  participantsInvolvedIds: string[];
  pros?: string[];
  cons?: string[];
  rationale?: string;
  decidedBy: string;
  timestamp: number;
  relatedActionItemIds?: string[];
  keywords?: string[];
  signature?: string;
}

export interface TopicInsight {
  id: string;
  name: string;
  keywords: string[];
  relevanceScore: number;
  summary?: string;
  sentiment?: { average: number; trend: 'rising' | 'falling' | 'stable' };
  startTimestamp: number;
  endTimestamp: number;
  relatedTranscriptSegmentIds?: string[];
}

export interface ParticipantDetailedInfo {
  id: string;
  name: string;
  role: string;
  email: string;
  organization: string;
  avatarUrl: string;
  joinTime: number;
  leaveTime?: number;
  totalSpeakingTime: number;
  speakingSegmentsCount: number;
  overallSentiment: { average: number; trend: 'rising' | 'falling' | 'stable' };
  engagementScore: number;
  dominantEmotions?: { emotion: string; score: number }[];
}

export interface SpatialObject {
  id: string;
  type: 'whiteboard' | 'presentation_screen' | '3d_model' | 'interactive_tool' | 'environment_element';
  label: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  interactedByParticipantIds?: string[];
  interactionCount?: number;
  metadata?: { [key: string]: any };
  snapshotUrl?: string;
}

export interface OverallMeetingSentiment {
  averageScore: number;
  sentimentTrend: { timestamp: number; score: number }[];
  dominantEmotions: { emotion: string; percentage: number }[];
  positiveSegmentsCount: number;
  negativeSegmentsCount: number;
  neutralSegmentsCount: number;
}

export interface MeetingMetadata {
  id: string;
  title: string;
  scheduledStartTime: number;
  actualStartTime: number;
  endTime?: number;
  durationSeconds?: number;
  hostId: string;
  hostName: string;
  attendeeIds: string[];
  meetingPlatform: string;
  recordingUrl?: string;
  location: string;
  tags: string[];
  category: string;
}

export interface ComplianceInsight {
  id: string;
  type: 'sentiment_anomaly' | 'policy_violation' | 'risk_flag' | 'missed_action_item' | 'resource_discrepancy';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: number;
  relatedSegmentIds?: string[];
  recommendedAction?: string;
  status: 'open' | 'resolved' | 'dismissed';
  agentId: string;
}

export interface AgentActivityLog {
  id: string;
  agentId: string;
  skill: string;
  action: string;
  timestamp: number;
  details: { [key: string]: any };
  signature?: string;
}

export interface PaymentRequestRecord {
  id: string;
  sourceParticipantId: string;
  targetParticipantId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'settled' | 'failed';
  createdAt: number;
  settledAt?: number;
  relatedActionItemId?: string;
  railUsed?: 'rail_fast' | 'rail_batch';
  transactionHash?: string;
  signature?: string;
}

export interface MeetingSummaryExtended {
  metadata: MeetingMetadata;
  participants: ParticipantDetailedInfo[];
  transcriptSegments: TranscriptSegment[];
  actionItems: ActionItem[];
  decisions: DecisionRecord[];
  topics: TopicInsight[];
  mindMapUrl: string;
  spatialObjects: SpatialObject[];
  overallSentiment: OverallMeetingSentiment;
  documentLinks?: { title: string; url: string; accessedBy?: string[] }[];
  keyTakeaways: string[];
  aiSummary: string;
  recommendations?: string[];
  futureMeetingSuggestions?: { date: number; topic: string; attendees: string[] }[];
  generatedReportUrl?: string;
  complianceInsights: ComplianceInsight[];
  agentActivityLogs: AgentActivityLog[];
  paymentRequests: PaymentRequestRecord[];
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  transcriptDisplayMode: 'realtime' | 'summary' | 'full';
  defaultLanguage: string;
  aiModelPreference: 'standard' | 'advanced' | 'custom';
  autoExportToCRM: boolean;
  autoScheduleFollowUp: boolean;
  autoProcessPayments: boolean;
  notificationSettings: {
    newActionItem: boolean;
    meetingEndedSummary: boolean;
    sentimentAlert: boolean;
    complianceIssue: boolean;
    paymentStatus: boolean;
  };
}

export interface HistoricalMeetingRecord {
  id: string;
  title: string;
  date: number;
  duration: number;
  hostName: string;
  keyTopics: string[];
  overallSentimentScore: number;
  actionItemsCount: number;
  summaryPreview: string;
  complianceIssuesCount: number;
  paymentRequestsCount: number;
}
