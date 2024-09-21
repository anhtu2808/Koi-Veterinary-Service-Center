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
    String invoice_id;
    LocalDateTime update_date;
    float total_price;
    boolean payment_status;
    LocalDateTime create_at;

    @OneToOne
    @JoinColumn(name = "appointment_id", referencedColumnName = "appointment_id")
    Appointment appointment;
}
