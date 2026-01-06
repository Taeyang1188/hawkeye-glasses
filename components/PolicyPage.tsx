
import React from 'react';
import { ArrowLeft, HelpCircle, RefreshCcw, Truck } from 'lucide-react';

interface PolicyPageProps {
  onBack: () => void;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-500">
      <section className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        <button onClick={onBack} className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest mb-12 hover:text-gray-500 transition-colors">
          <ArrowLeft size={16} /> <span>Back to Home</span>
        </button>

        <div className="max-w-3xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-light uppercase tracking-tight">Customer Care & Policies</h1>
            <p className="text-xs text-gray-400 uppercase tracking-[0.3em]">호크아이안경 서비스 이용 가이드</p>
          </div>

          {/* Exchange & Return */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
              <RefreshCcw size={20} className="text-gray-400" />
              <h2 className="text-lg font-bold uppercase tracking-widest">교환 및 반품 안내</h2>
            </div>
            <div className="space-y-6 text-sm text-gray-600 leading-relaxed font-light">
              <div className="bg-gray-50 p-6 border-l-2 border-black">
                <p className="font-bold text-black mb-2 uppercase tracking-widest">7-Day Guarantee</p>
                <p className="font-medium text-black">호크아이안경에서 구매하신 모든 제품은 수령일로부터 7일 이내에 반품이나 교환이 가능합니다.</p>
              </div>
              <ul className="list-disc pl-5 space-y-3">
                <li>변심에 의한 교환/반품 시 왕복 배송비는 고객님 부담이며, 제품의 가치가 유지되어야 합니다.</li>
                <li><strong>교환/반품 불가 기준:</strong> 착용 흔적이 있거나, 안경 피팅을 이미 진행한 경우, 구성품(케이스, 보증서 등)을 분실한 경우에는 처리가 어려울 수 있습니다.</li>
                <li>도수 가공된 렌즈는 개인 맞춤 상품으로, 가공 시작 후에는 렌즈 비용 환불이 불가하오니 신중한 결정을 부탁드립니다.</li>
                <li>제품 불량이나 배송 중 파손의 경우, 100% 무상 교환 및 반품을 약속드립니다.</li>
              </ul>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
              <Truck size={20} className="text-gray-400" />
              <h2 className="text-lg font-bold uppercase tracking-widest">배송 및 수령 안내</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
              <p>평일 오후 3시 이전 주문 건은 당일 검수 후 즉시 출고됩니다.</p>
              <p>도수 가공이 필요한 제품은 2~4일 정도의 조제 기간이 추가로 소요될 수 있습니다.</p>
              <p>모든 제품은 꼼꼼한 세척과 정밀 조율 과정을 거쳐 안전하게 발송됩니다.</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
              <HelpCircle size={20} className="text-gray-400" />
              <h2 className="text-lg font-bold uppercase tracking-widest">자주 묻는 질문 (FAQ)</h2>
            </div>
            <div className="space-y-10">
              <div className="space-y-2">
                <p className="font-bold text-black uppercase tracking-tight">Q. 온라인으로 사고 오프라인 매장에서 피팅을 받을 수 있나요?</p>
                <p className="text-sm font-light text-gray-600">네, 당연합니다. 호크아이안경 온라인 스토어 구매 고객님은 명동 매장 방문 시 언제든 무료 정밀 피팅 서비스를 받으실 수 있습니다.</p>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-black uppercase tracking-tight">Q. 제품 AS 기간은 어떻게 되나요?</p>
                <p className="text-sm font-light text-gray-600">기본적인 나사 조임, 소모품 교체 및 소독은 평생 무료로 제공됩니다. 부품 교체가 필요한 유상 수리의 경우 제조사의 정책에 따라 최선을 다해 지원해드립니다.</p>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-black uppercase tracking-tight">Q. 매장 방문 전 예약이 꼭 필요한가요?</p>
                <p className="text-sm font-light text-gray-600">예약 없이 방문하셔도 상담이 가능하지만, 1:1 정밀 피팅이나 상세 검안을 원하신다면 네이버 예약을 통해 시간을 정해주시는 것을 권장합니다.</p>
              </div>
            </div>
          </div>

          <div className="pt-20 text-center border-t border-gray-50">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em]">Hawkeye Optical Excellence in Service</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PolicyPage;
