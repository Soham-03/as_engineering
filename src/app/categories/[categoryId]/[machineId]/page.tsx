'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Machine } from '@/types';
import { ArrowLeft, Info, Phone, MessageCircle, X } from 'lucide-react';
import LoadingSpinner from '@/components/LodaingSpinner';

export default function MachineDetailsPage() {
 const params = useParams();
 const router = useRouter();
 const [machine, setMachine] = useState<Machine | null>(null);
 const [details, setDetails] = useState<Record<string, string>>({});
 const [additionalImages, setAdditionalImages] = useState<string[]>([]);
 const [currentSlide, setCurrentSlide] = useState(0);
 const [loading, setLoading] = useState(true);
 const [showDialog, setShowDialog] = useState(false);
 const phoneNumber = "9552269238";
 const categoryId = decodeURIComponent(params.categoryId as string);
 const machineId = decodeURIComponent(params.machineId as string);

 const handleCall = () => {
   window.location.href = `tel:+91${phoneNumber}`;
 };

 const handleWhatsApp = () => {
   const message = `Hi, I'm interested in ${machine?.id}. Please provide more details.`;
   const encodedMessage = encodeURIComponent(message);
   window.open(`https://wa.me/91${phoneNumber}?text=${encodedMessage}`, '_blank');
 };

 useEffect(() => {
   const fetchData = async () => {
     try {
       const machineRef = doc(db, 'categories', categoryId, 'machines', machineId);
       const machineDoc = await getDoc(machineRef);
       
       const detailsRef = doc(db, 'categories', categoryId, 'machines', machineId, 'details', 'details');
       const detailsDoc = await getDoc(detailsRef);
       
       const imagesRef = doc(db, 'categories', categoryId, 'machines', machineId, 'images', 'images');
       const imagesDoc = await getDoc(imagesRef);

       if (machineDoc.exists()) {
        console.log('Fetched machine:', { id: machineDoc.id, ...machineDoc.data() });
        setMachine({ id: machineDoc.id, ...machineDoc.data() } as Machine);
       }
       
       if (detailsDoc.exists()) {
         setDetails(detailsDoc.data() as Record<string, string>);
       }

       if (imagesDoc.exists()) {
         const imageData = imagesDoc.data();
         const imageUrls = Object.values(imageData) as string[];
         setAdditionalImages(imageUrls);
       }
     } catch (error) {
       console.error('Error fetching data:', error);
     } finally {
       setLoading(false);
     }
   };

   if (categoryId && machineId) {
     fetchData();
   }
 }, [categoryId, machineId]);

 if (loading) return <LoadingSpinner />;
 if (!machine) return <div className="min-h-screen flex items-center justify-center"><div>Machine not found</div></div>;

 const slides = [
   { url: machine.machineImg, id: 0 },
   ...additionalImages.map((url, index) => ({ url, id: index + 1 })),
 ];

 return (
   <div className="min-h-screen bg-gray-50">
     <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
       <div className="max-w-6xl mx-auto px-4 py-6">
         <button 
           onClick={() => router.back()}
           className="flex items-center gap-2 hover:bg-blue-600/20 px-4 py-2 rounded-lg transition-colors"
         >
           <ArrowLeft size={20} />
           Back to {categoryId}
         </button>
       </div>
     </div>

     <div className="max-w-6xl mx-auto px-4 py-12">
       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
           <div className="space-y-6">
             <div className="relative h-[500px] rounded-xl overflow-hidden group">
               <Image
                 src={slides[currentSlide].url}
                 alt={machine.id}
                 fill
                 className="object-contain bg-gray-50"
               />
               {slides.length > 1 && (
                 <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                   {currentSlide + 1} / {slides.length}
                 </div>
               )}
             </div>
             
             {slides.length > 1 && (
               <div className="flex gap-3 overflow-x-auto pb-2">
                 {slides.map((slide, index) => (
                   <button
                     key={slide.id}
                     onClick={() => setCurrentSlide(index)}
                     className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden transition-all
                       ${currentSlide === index 
                         ? 'ring-2 ring-blue-500 ring-offset-2' 
                         : 'opacity-70 hover:opacity-100'}`}
                   >
                     <Image
                       src={slide.url}
                       alt={`${machine.id} - ${index + 1}`}
                       fill
                       className="object-cover"
                     />
                   </button>
                 ))}
               </div>
             )}
           </div>

           <div className="space-y-6">
             <div>
               <h1 className="text-3xl font-bold mb-4">{machine.id}</h1>
               <div className="text-2xl font-bold text-blue-600">
                 {machine.price ? `${machine.price} Rs.` : 'Price on Request'}
               </div>
             </div>

             <div className="space-y-4">
               {Object.entries(details).map(([key, value]) => (
                 <div 
                   key={key}
                   className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                 >
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-blue-100 rounded-lg">
                       <Info className="w-5 h-5 text-blue-600" />
                     </div>
                     <div>
                       <div className="text-sm text-gray-600 font-medium">{key}</div>
                       <div className="font-semibold text-gray-900">{value}</div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>

             <button 
               onClick={() => setShowDialog(true)}
               className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl
                 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg"
             >
               Request Quote
             </button>
           </div>
         </div>

         {machine.youtube && (
           <div className="border-t p-8">
             <h2 className="text-2xl font-semibold mb-6">Product Demo</h2>
             <div className="relative pt-[56.25%] rounded-xl overflow-hidden bg-gray-50">
               <iframe
                 src={`https://www.youtube.com/embed/${machine.youtube.split('v=')[1]}`}
                 className="absolute top-0 left-0 w-full h-full"
                 allowFullScreen
               />
             </div>
           </div>
         )}
       </div>
     </div>

     {showDialog && (
       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
         <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold">Contact Sales Team</h3>
             <button 
               onClick={() => setShowDialog(false)}
               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
             >
               <X className="w-5 h-5" />
             </button>
           </div>
           
           <p className="text-gray-600 mb-6">
             Get in touch with our sales team for pricing and more details about {machine?.id}
           </p>

           <div className="space-y-3">
             <button
               onClick={handleWhatsApp}
               className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-4 px-6 rounded-xl
                 hover:bg-green-600 transition-colors font-semibold"
             >
               <MessageCircle className="w-5 h-5" />
               Chat on WhatsApp
             </button>
             <button
               onClick={handleCall}
               className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-4 px-6 rounded-xl
                 hover:bg-blue-600 transition-colors font-semibold"
             >
               <Phone className="w-5 h-5" />
               Call Now
             </button>
           </div>

           <div className="mt-6 text-center text-gray-500 text-sm">
             Available Monday to Saturday, 9 AM - 6 PM
           </div>
         </div>
       </div>
     )}
   </div>
 );
}