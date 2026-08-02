import {
    User,
    Phone,
    MapPin,
    Building2,
    Map,
    Landmark,
} from "lucide-react";

const inputClass =
    "w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-700 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-100";

const DeliveryAddress = ({ formData, onChange }) => {
    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm">

            <div className="mb-8">

                <h2 className="text-2xl font-bold text-gray-800">
                    Delivery Address
                </h2>

                <p className="mt-2 text-gray-500">
                    Please enter your shipping details.
                </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

                {/* Full Name */}

                <div className="relative">

                    <User
                        size={20}
                        className="absolute left-4 top-4 text-orange-500"
                    />

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={onChange}
                        className={inputClass}
                    />

                </div>

                {/* Phone */}

                <div className="relative">

                    <Phone
                        size={20}
                        className="absolute left-4 top-4 text-orange-500"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={onChange}
                        className={inputClass}
                    />

                </div>

            </div>

            {/* Address */}

            <div className="relative mt-5">

                <MapPin
                    size={20}
                    className="absolute left-4 top-4 text-orange-500"
                />

                <textarea
                    rows={4}
                    name="addressLine1"
                    placeholder="House No, Street, Area..."
                    value={formData.addressLine1}
                    onChange={onChange}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />

            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

                {/* Landmark */}

                <div className="relative">

                    <Landmark
                        size={20}
                        className="absolute left-4 top-4 text-orange-500"
                    />

                    <input
                        type="text"
                        name="landmark"
                        placeholder="Landmark (Optional)"
                        value={formData.landmark}
                        onChange={onChange}
                        className={inputClass}
                    />

                </div>

                {/* City */}

                <div className="relative">

                    <Building2
                        size={20}
                        className="absolute left-4 top-4 text-orange-500"
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={onChange}
                        className={inputClass}
                    />

                </div>

            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

                {/* State */}

                <div className="relative">

                    <Map
                        size={20}
                        className="absolute left-4 top-4 text-orange-500"
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={onChange}
                        className={inputClass}
                    />

                </div>

                {/* PIN */}

                <div className="relative">

                    <MapPin
                        size={20}
                        className="absolute left-4 top-4 text-orange-500"
                    />

                    <input
                        type="text"
                        name="postalCode"
                        placeholder="PIN Code"
                        value={formData.postalCode}
                        onChange={onChange}
                        className={inputClass}
                    />

                </div>

            </div>

        </div>
    );
};

export default DeliveryAddress;