package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.model.entity.Contact;
import com.koicenter.koicenterbackend.model.request.Contact.ContactRequest;
import com.koicenter.koicenterbackend.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository contactRepository;

    public Contact saveContact(ContactRequest contactRequest) {
        Contact contact = new Contact();
        contact.setName(contactRequest.getName());
        contact.setEmail(contactRequest.getEmail());
        contact.setSubject(contactRequest.getSubject());
        contact.setMessage(contactRequest.getMessage());
        return contactRepository.save(contact);
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Optional<Contact> getContactById(String id) {
        return contactRepository.findById(id);
    }
}
