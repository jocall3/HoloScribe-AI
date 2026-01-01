
import { 
  TranscriptSegment, 
  ActionItem, 
  DecisionRecord, 
  ParticipantDetailedInfo, 
  ComplianceInsight, 
  MeetingSummaryExtended,
  PaymentRequestRecord,
  UserPreferences,
  HistoricalMeetingRecord,
  AgentActivityLog,
  TopicInsight,
  SpatialObject,
  OverallMeetingSentiment
} from '../types';
import { 
  MOCK_PARTICIPANT_NAMES, 
  MOCK_ROLES, 
  MOCK_ORGS, 
  MOCK_TOPICS, 
  MOCK_ACTIONS, 
  MOCK_DECISIONS, 
  MOCK_EMOTIONS, 
  MOCK_INTENTS 
} from '../constants';

// Utility: Generate ID
export const generateId = (): string => Math.random().toString(36).substring(2, 15);

// Utility: Simulate Delay
export const simulateAILoad = (ms: number = 1000): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Utility: Random Choice
export const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const getRandomNumber = (min: number, max: number): number => Math.random() * (max - min) + min;

/**
 * Identity & Access Management Service
 */
export class IdentityAndAccessService {
  private static instance: IdentityAndAccessService;
  public userRoles: Map<string, string> = new Map();
  private userKeys: Map<string, { publicKey: string; privateKey: string }> = new Map();

  private constructor() {
    MOCK_PARTICIPANT_NAMES.forEach(name => {
      const id = `user-${name.replace(/\s/g, '').toLowerCase()}`;
      this.userRoles.set(id, getRandomItem(MOCK_ROLES));
      this.generateKeyPair(id);
    });
    this.userRoles.set('current_user_id', 'Host');
    this.generateKeyPair('current_user_id');
  }

  public static getInstance(): IdentityAndAccessService {
    if (!IdentityAndAccessService.instance) IdentityAndAccessService.instance = new IdentityAndAccessService();
    return IdentityAndAccessService.instance;
  }

  private generateKeyPair(entityId: string): void {
    const publicKey = `PUB-${entityId}-${Math.random().toString(36).substring(7)}`;
    const privateKey = `PRI-${entityId}-${Math.random().toString(36).substring(7)}`;
    this.userKeys.set(entityId, { publicKey, privateKey });
  }

  public async signData(entityId: string, data: any): Promise<string> {
    await simulateAILoad(100);
    const keys = this.userKeys.get(entityId);
    return btoa(`${keys?.privateKey}:${JSON.stringify(data)}`);
  }

  public async verifySignature(entityId: string, data: any, signature: string): Promise<boolean> {
    await simulateAILoad(100);
    return signature.includes(entityId);
  }

  public async authorize(userId: string, requiredRoles: string[]): Promise<boolean> {
    const role = this.userRoles.get(userId);
    return role ? requiredRoles.includes(role) : false;
  }
}

/**
 * Payment Simulation Service (Token Rails)
 */
export class PaymentSimulationService {
  private static instance: PaymentSimulationService;
  private ledger: Map<string, number> = new Map();

  private constructor() {
    MOCK_PARTICIPANT_NAMES.forEach(name => {
      const id = `user-${name.replace(/\s/g, '').toLowerCase()}`;
      this.ledger.set(id, getRandomNumber(1000, 5000));
    });
    this.ledger.set('current_user_id', 10000);
  }

  public static getInstance(): PaymentSimulationService {
    if (!PaymentSimulationService.instance) PaymentSimulationService.instance = new PaymentSimulationService();
    return PaymentSimulationService.instance;
  }

  public async settlePayment(requestId: string, rail: 'rail_fast' | 'rail_batch'): Promise<void> {
    await simulateAILoad(rail === 'rail_fast' ? 500 : 2000);
  }
}

/**
 * Meeting Intelligence Service
 */
export class MeetingDataService {
  private static instance: MeetingDataService;
  public historicalMeetings: HistoricalMeetingRecord[] = [];

  private constructor() {
    for (let i = 0; i < 6; i++) {
      this.historicalMeetings.push({
        id: generateId(),
        title: `Strategic Alignment - Session ${i + 1}`,
        date: Date.now() - (i * 86400000 * 7),
        duration: 3600 + i * 600,
        hostName: getRandomItem(MOCK_PARTICIPANT_NAMES),
        keyTopics: [getRandomItem(MOCK_TOPICS), getRandomItem(MOCK_TOPICS)],
        overallSentimentScore: getRandomNumber(-0.2, 0.8),
        actionItemsCount: Math.floor(getRandomNumber(1, 5)),
        summaryPreview: "Automated summary of the strategic meeting...",
        complianceIssuesCount: Math.floor(getRandomNumber(0, 2)),
        paymentRequestsCount: Math.floor(getRandomNumber(0, 3)),
      });
    }
  }

  public static getInstance(): MeetingDataService {
    if (!MeetingDataService.instance) MeetingDataService.instance = new MeetingDataService();
    return MeetingDataService.instance;
  }

  // Added getHistoricalMeetings to support App.tsx usage
  public async getHistoricalMeetings(): Promise<HistoricalMeetingRecord[]> {
    await simulateAILoad(300);
    return this.historicalMeetings;
  }

  public async fetchLiveTranscriptSegments(): Promise<TranscriptSegment[]> {
    await simulateAILoad(500);
    const participant = getRandomItem(MOCK_PARTICIPANT_NAMES);
    const id = `user-${participant.replace(/\s/g, '').toLowerCase()}`;
    return [{
      participantId: id,
      participantName: participant,
      text: `We should focus on ${getRandomItem(MOCK_TOPICS)} to ensure our roadmap is aligned with Q4 goals.`,
      timestamp: Date.now(),
      sentimentScore: getRandomNumber(-0.5, 0.9),
      intent: getRandomItem(MOCK_INTENTS),
      keywords: [getRandomItem(MOCK_TOPICS)]
    }];
  }

  public async finalizeSummary(transcript: TranscriptSegment[]): Promise<MeetingSummaryExtended> {
    await simulateAILoad(2000);
    const id = generateId();
    return {
      metadata: {
        id,
        title: "Executive Strategic Review",
        scheduledStartTime: Date.now() - 3600000,
        actualStartTime: Date.now() - 3500000,
        endTime: Date.now(),
        durationSeconds: 3500,
        hostId: 'current_user_id',
        hostName: "Admin User",
        attendeeIds: transcript.map(s => s.participantId),
        meetingPlatform: "HoloScribe Connect",
        location: "Virtual HQ - Spatial Room 101",
        tags: ["Strategy", "Executive", "Q4"],
        category: "Management"
      },
      participants: Array.from(new Set(transcript.map(s => s.participantId))).map(pid => ({
        id: pid,
        name: pid.split('-')[1],
        role: "Participant",
        email: `${pid}@innovatex.corp`,
        organization: "InnovateX Corp",
        avatarUrl: `https://picsum.photos/seed/${pid}/100/100`,
        joinTime: Date.now() - 3600000,
        totalSpeakingTime: 500,
        speakingSegmentsCount: 20,
        overallSentiment: { average: 0.5, trend: 'stable' },
        engagementScore: 85
      })),
      transcriptSegments: transcript,
      actionItems: [{
        id: generateId(),
        assigneeId: transcript[0]?.participantId || 'unknown',
        assigneeName: transcript[0]?.participantName || 'Unknown',
        task: "Refine the Q4 marketing strategy document",
        status: 'open',
        dueDate: Date.now() + 86400000 * 3,
        priority: 'high',
        createdBy: 'current_user_id',
        createdAt: Date.now()
      }],
      decisions: [{
        id: generateId(),
        summary: "Finalized budget for Q4 marketing spend.",
        participantsInvolvedIds: transcript.map(s => s.participantId),
        decidedBy: 'current_user_id',
        timestamp: Date.now(),
        rationale: "Consensus reached based on ROI projections."
      }],
      topics: [{
        id: generateId(),
        name: "Budget Allocation",
        keywords: ["Budget", "Spend", "Q4"],
        relevanceScore: 0.95,
        startTimestamp: Date.now() - 2000000,
        endTimestamp: Date.now() - 1000000
      }],
      mindMapUrl: "/assets/mindmap.glb",
      spatialObjects: [],
      overallSentiment: {
        averageScore: 0.45,
        sentimentTrend: [],
        dominantEmotions: [{ emotion: "joy", percentage: 40 }],
        positiveSegmentsCount: 15,
        negativeSegmentsCount: 2,
        neutralSegmentsCount: 8
      },
      keyTakeaways: ["Strategy approved", "Budget allocated", "Roadmap confirmed"],
      aiSummary: "The meeting focused on the strategic alignment of the Q4 roadmap...",
      complianceInsights: [],
      agentActivityLogs: [],
      paymentRequests: []
    };
  }
}
