package com.example.demo.controller;

import com.example.demo.domain.dto.DomainNameDto;
import com.example.demo.domain.mapper.DomainNameMapper;
import com.example.demo.service.DomainNameService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@Transactional
public class DomainNameController {

    private final Logger log = LoggerFactory.getLogger(DomainNameController.class);

    @Autowired
    private DomainNameService domainNameService;

    @PostMapping("/domainNames")
    public ResponseEntity<DomainNameDto> createDomainName(@RequestBody DomainNameDto domainName) throws Exception {
        log.debug("REST request to save domainName : {}", domainName);
        if (domainName.getId() != null) {
            throw new RuntimeException("A new domainName cannot already have an ID");
        }
        DomainNameDto result = domainNameService.createDomainName(DomainNameMapper.INSTANCE.toEntity(domainName))
                .map(it -> DomainNameMapper.INSTANCE.toDto(it))
                .get();
        return ResponseEntity
                .created(new URI("/api/domainNames/" + result.getId()))
                .body(result);
    }

    @PutMapping("/domainNames/{id}")
    public ResponseEntity<DomainNameDto> updateDomainName(@PathVariable Long id, @RequestBody DomainNameDto domainName) {
        log.debug("REST request to update domainName : {}", domainName);
        if (domainName.getId() == null) {
            throw new RuntimeException("Invalid id");
        }
        domainName.setId(id);
        return domainNameService.getDomainNameById(domainName.getId())
                .map(it -> DomainNameMapper.INSTANCE.toEntity(domainName, it))
                .map(it -> ResponseEntity.ok().body(DomainNameMapper.INSTANCE.toDto(domainNameService.updateDomainName(it).get())))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/domainNames")
    public List<DomainNameDto> getAllDomainNames() {
        log.debug("REST request to get all domainNames");
        return domainNameService.getAllDomainNames().stream()
                .map(it -> DomainNameMapper.INSTANCE.toDto(it))
                .collect(Collectors.toList());
    }

    @GetMapping("/domainNames/{id}")
    public ResponseEntity<DomainNameDto> getDomainName(@PathVariable Long id) {
        log.debug("REST request to get domainName : {}", id);
        return domainNameService.getDomainNameById(id)
                .map(it -> ResponseEntity.ok().body(DomainNameMapper.INSTANCE.toDto(domainNameService.updateDomainName(it).get())))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/domainNames/{id}")
    public ResponseEntity<Void> deleteDomainName(@PathVariable Long id) {
        log.debug("REST request to delete domainName : {}", id);
        domainNameService.deleteDomainName(id);
        return ResponseEntity.noContent().build();
    }
    
}