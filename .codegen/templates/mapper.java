package com.example.demo.domain.mapper;

import com.example.demo.domain.model.DomainName;
import com.example.demo.domain.dto.DomainNameDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;
import com.example.demo.domain.enums.*;

public class  DomainNameMapper {

	public static final DomainNameMapper INSTANCE = new DomainNameMapper();

	public DomainName toEntity(DomainNameDto dto) {
		if (dto == null) return null;
		DomainName entity = new DomainName();
		return toEntity(dto, entity);
	}

	public DomainName toEntity(DomainNameDto dto, DomainName entity) {
		if (dto == null) return entity;
		entity.setId(dto.getId());
		entity.setAttribute(dto.getAttribute());
		entity.setAttribute(!(dto.getAttribute() == null || dto.getAttribute().isBlank()) ? LocalDate.parse(dto.getAttribute(), DateTimeFormatter.ISO_DATE) : null);
		entity.setAttribute(!(dto.getAttribute() == null || dto.getAttribute().isBlank()) ? TypeDomainName.valueOf(dto.getAttribute()) : null);
		entity.setAttribute(OtherMapper.INSTANCE.toEntity(dto.getAttribute()));		
		entity.setAttribute(dto.getAttribute().stream().map(it -> OtherMapper.INSTANCE.toEntity(it)).collect(Collectors.toList()));
		return entity;
	}

	public DomainNameDto toDto(DomainName entity) {
		if (entity == null) return null;
		DomainNameDto dto = new DomainNameDto();
		dto.setId(entity.getId());
		dto.setAttribute(entity.getAttribute());
		dto.setAttribute(entity.getAttribute() != null ? entity.getDate().format(DateTimeFormatter.ISO_DATE) : null);
		dto.setAttribute(entity.getAttribute() != null ? entity.getAttribute().name() : null);
		dto.setAttribute(OtherMapper.INSTANCE.toDto(entity.getAttribute()));
		dto.setAttribute(entity.getAttribute().stream().map(it -> OtherMapper.INSTANCE.toDto(it)).collect(Collectors.toList()));
		return dto;
	}

}