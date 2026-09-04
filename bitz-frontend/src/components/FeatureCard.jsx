import React from 'react';

const FeatureCard = ({ icon, title, description, gradient }) => {
  return (
    <div className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-gray-100">
      <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
};

export default FeatureCard;