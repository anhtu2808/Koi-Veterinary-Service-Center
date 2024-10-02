const sampleKoiData = [
    {
        koiId: 1,
        name: "Kohaku",
        breed: "Kohaku",
        age: 3,
        length: 45,
        weight: 2.5,
        color: "White with red patterns",
        description: "A beautiful Kohaku with vibrant red markings",
        appointmentId: "APT001"
    },
    {
        koiId: 2,
        name: "Taisho",
        breed: "Sanke",
        age: 2,
        length: 35,
        weight: 1.8,
        color: "White with red and black patterns",
        description: "A young Sanke with promising color development",
        appointmentId: "APT002"
    },
    {
        koiId: 3,
        name: "Showa",
        breed: "Showa Sanshoku",
        age: 4,
        length: 50,
        weight: 3.2,
        color: "Black with red and white patterns",
        description: "An elegant Showa with balanced color distribution",
        appointmentId: "APT003"
    },
    {
        koiId: 4,
        name: "Platinum",
        breed: "Ogon",
        age: 1,
        length: 25,
        weight: 0.8,
        color: "Solid platinum",
        description: "A young Ogon with a lustrous platinum sheen",
        appointmentId: "APT001"
    },
    {
        koiId: 5,
        name: "Butterfly",
        breed: "Butterfly Koi",
        age: 5,
        length: 60,
        weight: 4.0,
        color: "Orange and white with long fins",
        description: "A majestic Butterfly Koi with flowing fins",
        appointmentId: "APT002"
    },
    {
        koiId: 6,
        name: "Azure",
        breed: "Asagi",
        age: 3,
        length: 40,
        weight: 2.2,
        color: "Blue scales with red highlights",
        description: "An Asagi with a striking blue netted pattern",
        appointmentId: "APT003"
    },
    {
        koiId: 7,
        name: "Tancho",
        breed: "Tancho Kohaku",
        age: 2,
        length: 30,
        weight: 1.5,
        color: "White with a red circle on head",
        description: "A Tancho Kohaku with a perfect circular red patch",
        appointmentId: "APT001"
    }
];

export const fetchKoiByCustomerIdAPI = (customerId) => {
 
      return Promise.resolve({ data: sampleKoiData });
    }

export const fetchKoisByAppointmentIdAPI = (appointmentId) => {
    const filteredKoi = sampleKoiData.filter(koi => koi.appointmentId === appointmentId);
    return Promise.resolve({ data: filteredKoi });
}
