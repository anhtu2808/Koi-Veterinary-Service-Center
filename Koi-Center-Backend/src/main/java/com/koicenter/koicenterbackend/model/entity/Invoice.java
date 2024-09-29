package com.koicenter.koicenterbackend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "invoice_id")
    String invoiceId;
    @Column(name = "update_date")
    LocalDateTime updatDate;
    @Column(name = "total_price")
    float totalPrice;
    @Column(name = "payment_status")
    boolean paymentStatus;
    @Column(name = "create_at")
    LocalDateTime createAt;

    @OneToOne
    @JoinColumn(name = "appointment_id", referencedColumnName = "appointment_id")
    Appointment appointment;
}
